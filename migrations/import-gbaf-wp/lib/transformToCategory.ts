import {uuid} from '@sanity/uuid'
import {decode} from 'html-entities'
import type {SanityClient} from 'sanity'
import type {WP_REST_API_Term} from 'wp-types'

import type {Category, MetaTag} from '../../../sanity.types'


// Remove these keys because they'll be created by Content Lake
type StagedCategory = Omit<Category, '_createdAt' | '_updatedAt' | '_rev'>

export async function transformToCategory(  wpDoc: WP_REST_API_Term,): Promise<StagedCategory> {
  const doc: StagedCategory = {
    _id: `category-${wpDoc.id}`,
    _type: 'category',
  }

  doc.name = wpDoc.name as string

  if (wpDoc.slug) {
    doc.slug = { _type: 'slug', current: wpDoc.slug }
  }

  if (wpDoc.description) {
    doc.description = wpDoc.description as string
  }

  if (wpDoc.parent) {
    doc.parent = { _ref: wpDoc.parent.toString(), _type: 'reference' }
  }

  if (wpDoc.meta)
    {
      doc.meta = {
          _type: "metaTag",
      } as MetaTag
    }

  return doc
}
