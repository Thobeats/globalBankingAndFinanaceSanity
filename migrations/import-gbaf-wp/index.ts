import {createClient} from '@sanity/client'
import pLimit from 'p-limit'
import {uuid} from '@sanity/uuid'
import {createOrReplace, defineMigration} from 'sanity/migrate'
import type {WP_REST_API_Pages, WP_REST_API_Post, WP_REST_API_Term, WP_REST_API_User} from 'wp-types'

import {getDataTypes} from './lib/getDataTypes'
import {sanityFetchImages} from './lib/sanityFetchImages'
import {transformToPost} from './lib/transformToPost'
import {wpDataTypeFetch} from './lib/wpDataTypeFetch'
import { transformToAuthor } from './lib/transformToAuthor'
import { transformToCategory } from './lib/transformToCategory'
import { transformToTag } from './lib/transformToTag'
import { transformToPage } from './lib/transformToPage'
import { htmlToBlockPageContent } from './lib/htmlToBlockPageContent'
import { htmlToBlockPageExcerpt } from './lib/htmlToBlockPageExcerpt'
import { Code, PortableText } from '../../sanity.types'

const limit = pLimit(5)

// Add image imports, parallelized and limited
export default defineMigration({
  title: 'Import GBAF WP JSON data',

  async *migrate(docs, context) {
    // Create a full client to handle image uploads
    const client = createClient(context.client.config())

    const existingImages = await sanityFetchImages(client)


    const pages = await client.fetch('*[_type == "page" && slug.current == "global-banking-finance-review-awards"]');
   // console.log(pages[0].content);
    let idx = 0;
    pages.forEach(async (page) => {
        let pageId = page._id.split('-')[1];
        const wpPageRequest = await fetch(`https://stg-globalbankingandfinance-gbafstaging.kinsta.cloud/wp-json/wp/v2/pages/${pageId}`);
        const wpPage = await wpPageRequest.json();
        // const content = await htmlToBlockPageContent(wpPage.content.rendered, client, existingImages);
        // const excerpt = await htmlToBlockPageExcerpt(wpPage.excerpt.rendered, client, existingImages);
        const content:PortableText = [];
        const code_content: Code = {
          _type: "code",
          code: wpPage.content.rendered,
          _key: uuid()
        };
        content.push(code_content);
        const excerpt:PortableText = [];
        const code_excerpt:Code = {
          "_type" : "code",
          "code" : wpPage.excerpt.rendered,
          "_key" : uuid()
        };
        excerpt.push(code_excerpt);
        const meta ={
            "_type": "seoMetaFields",
            "metaDescription": wpPage.meta._seopress_titles_desc,
            "metaTitle": wpPage.meta._seopress_titles_title,
        }

        const update = await client.patch(page._id).set({
            "meta": meta,
           // "content": content,
            "excerpt": excerpt
        }).commit();
        idx++;

        console.log(update, idx);

    });
  },
})
