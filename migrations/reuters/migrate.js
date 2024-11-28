import {getAccessToken, getAllItemContents, getCategoryItems} from './script.js'
import {
  createReuterPost,
  createArticle,
  getAuthor,
  getCategory,
  uploadImage,
} from './sanity_helpers.js'
import {uuid} from '@sanity/uuid'
import {searchUnsplashPhotos} from './unsplash.js'

try {
  getAccessToken().then(async (access_token) => {
    const categoryItems = await getCategoryItems(access_token)
    const allItemContents = await getAllItemContents(categoryItems, access_token)
    const author = await getAuthor('Reuters')
    const categories = await getCategory(['Business', 'Finance'])

    allItemContents.forEach(async (item) => {
      if (item.thumbnailUrl === null) {
        const photos = await searchUnsplashPhotos(item.headLine)
        item.thumbnailUrl = photos.results[0].urls.regular
      }

      let featureImage = await uploadImage(item.thumbnailUrl, item.headLine.replace(/\s/g, '-'))

      const post = {
        _type: 'post',
        _id: uuid(),
        title: item.headLine,
        slug: {
          _type: 'slug',
          current: item.headLine,
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
        date: new Date(item.contentCreated).toISOString(),
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
            code: item.bodyXhtml,
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

      const postId = await createReuterPost(post)
      const formattedDate = new Date(item.contentCreated).toISOString()

      const article = {
        _type: 'article',
        _id: uuid(),
        post: {
          _type: 'reference',
          _ref: postId,
        },
        source: item.source.literal,
        date: formattedDate,
        versionGuid: item.uri,
        traffic: 0,
        status: 'active',
      }
      const articleId = await createArticle(article)
      console.log(articleId)
    })

    console.log(allItemContents)
  })
} catch (err) {
  console.error(err.message)
}
