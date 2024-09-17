import {uuid} from '@sanity/uuid'
import {decode} from 'html-entities'
import type {SanityClient} from 'sanity'
import type {WP_REST_API_User} from 'wp-types'

import type {Author} from '../../../sanity.types'


// Remove these keys because they'll be created by Content Lake
type StagedAuthor = Omit<Author, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToAuthor(  wpDoc: WP_REST_API_User,): Promise<StagedAuthor> {
  const doc: StagedAuthor = {
    _id: `author-${wpDoc.id}`,
    _type: 'author',
  }

  doc.name = wpDoc.name as string

  if (wpDoc.slug) {
    doc.slug = { _type: 'slug', current: wpDoc.slug }
  }

  if (wpDoc.url) {
    doc.url = wpDoc.url as string
  }

  if (wpDoc.description) {
    doc.description = wpDoc.description as string
  }

  // Document has an image
  // if (typeof wpDoc.featured_media === 'number' && wpDoc.featured_media > 0) {
  //   // Image exists already in dataset
  //   if (existingImages[wpDoc.featured_media]) {
  //     doc.featuredMedia = sanityIdToImageReference(existingImages[wpDoc.featured_media])
  //   } else {
  //     // Retrieve image details from WordPress
  //     const metadata = await wpImageFetch(wpDoc.featured_media)

  //     if (metadata?.source?.url) {
  //       // Upload to Sanity
  //       const asset = await sanityUploadFromUrl(metadata.source.url, client, metadata)

  //       if (asset) {
  //         doc.featuredMedia = sanityIdToImageReference(asset._id)
  //         existingImages[wpDoc.featured_media] = asset._id
  //       }
  //     }
  //   }
  // }

  return doc
}
