const { createClient } = require('@sanity/client');
const { Schema } = require('@sanity/schema');

const client = createClient({
    projectId: 'v0gkry1w',
    dataset: 'production',
    // Whether or not to use the API CDN for queries. Default is false.
    useCdn: false,
    // If you are starting a new project, using the current UTC date is usually
    // a good idea. See "Specifying API version" section for more details
    apiVersion: "2024-10-04",
 //   'studioHost': 'gbaf',
});


async function updatePages()
{
    const pages = await client.fetch('*[_type == "page" && meta.content == null][0...1]');
    pages.forEach(async (page) => {
        let pageId = page._id.split('-')[1];
        const wpPageRequest = await fetch(`https://stg-globalbankingandfinance-gbafstaging.kinsta.cloud/wp-json/wp/v2/pages/${pageId}`);
        const wpPage = await wpPageRequest.json();
        const content = wpPage.content.rendered;
        const excerpt = wpPage.excerpt.rendered;
        const meta ={
            "_type": "seoMetaFields",
            "metaDescription": wpPage.meta._seopress_titles_desc,
            "metaTitle": wpPage.meta._seopress_titles_title,
        }

        const update = await client.patch(page._id).set({
            "meta": meta,
            "content": content,
            "excerpt": excerpt
        }).commit();

        console.log(update);

    });
}

updatePages();
