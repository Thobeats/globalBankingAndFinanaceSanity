import type {Page} from '../../../sanity.types'

export function sanityPageIdToImageReference(id: string): Page['featuredMedia'] {
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: id},
  }
}
