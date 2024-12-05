import {getAccessToken, getAllItemContents, getCategoryItems} from './script.js'
import {
  createReuterPost,
  createArticle,
  getAuthor,
  getCategory,
  uploadImage,
  trimContent,
  getArticle,
  updateContent
} from './sanity_helpers.js'
import {uuid} from '@sanity/uuid'
import {searchUnsplashPhotos} from './unsplash.js'

const MAX_RETRIES = 5
const RETRY_DELAY_MS = 1000

async function makeRequestRetry(requestFn, retries = MAX_RETRIES) {
  try {
    return await requestFn()
  } catch (error) {
    if (error.statusCode === 429 && retries > 0) {
      console.log(`Rate limited. Retrying in ${RETRY_DELAY_MS} ms...`)
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS))

      return makeRequestRetry(requestFn, retries - 1)
    } else {
      throw error
    }
  }
}

try {
  getAccessToken().then(async (access_token) => {
    const categoryItems = await getCategoryItems(access_token)
    const allItemContents = await getAllItemContents(categoryItems, access_token)
    const author = await getAuthor('Reuters')
    const categories = await getCategory(['Business', 'Finance'])

    allItemContents.forEach(async (item) => {
      const getarticle = await getArticle(item.uri);

      if (getarticle.length > 0)
      {

        console.log(getarticle);
        //Update the Content
        const updateArticleContent = await updateContent(getarticle[0]._id, item.bodyXhtml);
        console.log(updateArticleContent._id);
        return;
      }

      if (item.thumbnailUrl === null) {
        const photos = await searchUnsplashPhotos(item.headLine)
        item.thumbnailUrl = photos?.results[0]?.urls?.regular
      }

      if (!item.thumbnailUrl) return

      let featureImage = await makeRequestRetry(() =>
        uploadImage(item?.thumbnailUrl, item?.headLine?.replace(/\s/g, '-')),
      )
      const post = {
        _type: 'post',
        _id: uuid(),
        title: item.headLine,
        slug: {
          _type: 'slug',
          current: item.slug,
        },
        author: {
          _type: 'reference',
          _ref: author[0]._id,
        },
        categories: categories.map((category) => {
          return {
            _type: 'reference',
            _ref: category._id,
            _key: uuid(),
          }
        }),
        date: new Date().toISOString(),
        modified: new Date(item.versionCreated).toISOString(),
        status: 'publish',
        sticky: true,
        format: 'standard',
        meta: {
          _type: 'seoMetaFields',
          metaTitle: item.headLine,
          metaDescription: item.fragment,
        },
        content: [
          {
            _type: 'code',
            code: trimContent(item.bodyXhtml),
            _key: uuid(),
          },
        ],
        excerpt: [
          {
            _type: 'block',
            _key: uuid(),
            children: [
              {
                _type: 'span',
                text: item.fragment,
              },
            ],
          },
        ],
        featuredMedia: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: featureImage._id,
          },
        },
      }

      const postId = await makeRequestRetry(() => createReuterPost(post))

      const article = {
        _type: 'article',
        _id: uuid(),
        post: {
          _type: 'reference',
          _ref: postId,
        },
        source: item.source.literal,
        date: new Date(item.versionCreated).toISOString(),
        versionGuid: item.uri,
        traffic: 0,
        status: 'active',
      }
      const articleId = await makeRequestRetry(() => createArticle(article))
      console.log(articleId)
    })

    //console.log(allItemContents)
  })
} catch (err) {
  console.error(err.message)
}
