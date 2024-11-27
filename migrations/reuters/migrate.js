import { getAccessToken, getAllItemContents, getCategoryItems } from "./script.js";
import { createReuterPost, createArticle, getAuthor, getCategory } from "./sanity_helpers.js";
import {uuid} from '@sanity/uuid'

try{
    getAccessToken().then(async (access_token) => {
        const categoryItems = await getCategoryItems(access_token);
        const allItemContents = await getAllItemContents(categoryItems, access_token);
        const author = await getAuthor('Reuters');
        const categories = await getCategory(['Business', 'Finance']);

        allItemContents.forEach(async (item) => {
            const post = {
                _type: 'post',
                _id: uuid(),
                title: item.headLine,
                slug: {
                    _type: 'slug',
                    current: item.headLine
                },
                author: {
                    _type: 'reference',
                    _ref: author[0]._id
                },
                categories: categories.map((category) => {
                    return {
                        _type: 'reference',
                        _ref: category._id,
                        _key: uuid()
                    }
                }),
                date: item.contentCreated,
                modified: item.versionCreated,
                status: item.pubStatus,
                sticky: true,
                format: 'standard',
                meta: {
                    _type: "seoMetaFields",
                    metaTitle: item.headLine,
                    metaDescription: item.fragment,
                },
                content: [{
                    _type: 'code',
                    code: item.bodyXhtml,
                    _key: uuid()
                }],
                excerpt: [
                    {
                        _type: 'block',
                        _key: uuid(),
                        children: [
                            {
                                _type: 'span',
                                text: item.fragment
                            }
                        ]
                    }
                ]
            };

            const postId = await createReuterPost(post);
            console.log(postId);
            const article = {
                _type: 'article',
                _id: uuid(),
                post: {
                    _type: 'reference',
                    _ref: postId
                },
                source: item.source.literal,
                date: item.contentCreated,
                traffic: 0,
                status: 'active'
            };
            const articleId = await createArticle(article);
            console.log(articleId);
        });

        //console.log(allItemContents);
    });
    

}catch(err)
{
    console.error(err.message);
}



