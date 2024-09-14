import {decode} from 'html-entities'
import type {WP_REST_API_Post} from 'wp-types'
import {uuid} from '@sanity/uuid'

import type {Post} from '../../../sanity.types'

// Remove these keys because they'll be created by Content Lake
type StagedPost = Omit<Post, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToPost(wpDoc: WP_REST_API_Post): Promise<StagedPost> {
  const doc: StagedPost = {
    _id: `post-${wpDoc.id}`,
    _type: 'post',
  }

  doc.title = decode(wpDoc.title.rendered).trim()

  if (wpDoc.slug) {
    doc.slug = { _type: 'slug', current: wpDoc.slug }
  }

  if (Array.isArray(wpDoc.categories) && wpDoc.categories.length) {
    doc.categories = wpDoc.categories.map((catId) => ({
      _type: 'reference',
      _ref: `category-${catId}`,
      _key: uuid()
    }))
  }

  if (Array.isArray(wpDoc.tags) && wpDoc.tags.length) {
    doc.tags = wpDoc.tags.map((tagId) => ({
      _type: 'reference',
      _ref: `tag-${tagId}`,
      _key: uuid()
    }))
  }

  if (wpDoc.author) {
    doc.author = {
      _type: 'reference',
      _ref: `author-${wpDoc.author}`
    }
  }

  if (wpDoc.date) {
    doc.date = wpDoc.date
  }
  
  if (wpDoc.modified) {
    doc.modified = wpDoc.modified
  }

  if (wpDoc.status) {
    doc.status = wpDoc.status as StagedPost['status']
  }

  if (wpDoc.format) {
    doc.format = wpDoc.format as StagedPost['format']
  }
  
  doc.sticky = wpDoc.sticky == true

  if (wpDoc.meta)
  {
    doc.meta = {
        _type: "seoMetaFields",
        metaTitle: wpDoc.meta_seopress_titles_title as string,
        metaDescription: wpDoc.meta_seopress_titles_desc as string,
    }
  }

  return doc
}
