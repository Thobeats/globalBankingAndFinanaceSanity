import type {SanitySchemaType, WordPressDataType} from './types'

// Replace this with your WordPress site's WP-JSON REST API URL
export const BASE_URL = `https://stg-globalbankingandfinance-gbafstaging.kinsta.cloud/wp-json/wp/v2`
export const PER_PAGE = 10000

export const WP_TYPE_TO_SANITY_SCHEMA_TYPE: Record<WordPressDataType, SanitySchemaType> = {
    categories: 'category',
    posts: 'post',
    pages: 'page',
    tags: 'tag',
    users: 'author',
}
