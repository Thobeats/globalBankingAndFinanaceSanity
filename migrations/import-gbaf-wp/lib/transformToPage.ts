import {decode} from 'html-entities'
import {DateTimeInput, type SanityClient} from 'sanity'
import type {WP_REST_API_Post} from 'wp-types'
import {sanityIdToImageReference} from './sanityIdToImageReference'
import {sanityUploadFromUrl} from './sanityUploadFromUrl'
import {wpImageFetch} from './wpImageFetch'
import {htmlToBlockContent} from './htmlToBlockContent'


import type {Page, SeoMetaFields} from '../../../sanity.types'

// Remove these keys because they'll be created by Content Lake
type StagedPage = Omit<Page, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToPage(
  wpDoc: WP_REST_API_Post,
  client: SanityClient,
  existingImages: Record<string, string> = {},
): Promise<StagedPage> {
  const doc: StagedPage = {
    _id: `page-${wpDoc.id}`,
    _type: 'page',
  }

  doc.title = decode(wpDoc.title.rendered).trim()
  doc.date = wpDoc.date
  doc.modified = wpDoc.modified

  if (wpDoc.slug)
  {
    doc.slug = { _type: 'slug', current: wpDoc.slug }
  }

  if (wpDoc.status) {
    doc.status = wpDoc.status as StagedPage['status']
  }

  if (wpDoc.content) {
    doc.content = await htmlToBlockContent(wpDoc.content.rendered, client, existingImages)
  }

  if (wpDoc.excerpt) {
    doc.excerpt = await htmlToBlockContent(wpDoc.excerpt.rendered, client, existingImages)
  }

  if (wpDoc.author) {
    doc.author = {
      _type: 'reference',
      _ref: `author-${wpDoc.author}`
    }
  }

  if (typeof wpDoc.featured_media === 'number' && wpDoc.featured_media > 0) {
    // Image exists already in dataset
    if (existingImages[wpDoc.featured_media]) {
      doc.featuredMedia = sanityIdToImageReference(existingImages[wpDoc.featured_media])
    } else {
      // Retrieve image details from WordPress
      try {
        const metadata = await wpImageFetch(wpDoc.featured_media);

        if (metadata?.source?.url) {
          // Upload to Sanity
          const asset = await sanityUploadFromUrl(metadata.source.url, client, metadata);

          if (asset) {
            doc.featuredMedia = sanityIdToImageReference(asset._id);
            existingImages[wpDoc.featured_media] = asset._id;
          }
        }
      } catch (error) {
        console.error(`Failed to fetch or upload image for media ID ${wpDoc.featured_media}`);
        console.error(error);
      }
    }
  }

  if (wpDoc.template)
  {
    doc.template = wpDoc.template as StagedPage['template']
  }

  if (wpDoc.parent) {
    doc.parent = { _ref: wpDoc.parent.toString(), _type: 'reference' }
  }

  if (wpDoc.meta)
  {
    doc.meta = {
        _type: "seoMetaFields",
    } as SeoMetaFields
  }


  return doc
}
