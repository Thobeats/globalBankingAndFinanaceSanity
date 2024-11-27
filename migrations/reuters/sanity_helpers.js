import {createClient} from '@sanity/client'
import {configDotenv} from 'dotenv'
import { Readable } from 'stream';
configDotenv()

const client = createClient({
  projectId: 'v0gkry1w',
  dataset: 'production',
  useCdn: true,
  apiVersion: new Date().toISOString().split('T')[0],
  token: process.env.token,
})

// const client2 = createClient({
//     "projectId": "v0gkry1w",
//     "dataset": "new_content1",
//     "useCdn": true,
//     "apiVersion": new Date().toISOString().split('T')[0],
//     "token": process.env.token
// });

export async function createReuterPost(post) {
  const result = await client.create(post)
  return result._id
}

export async function createArticle(article) {
  const result = await client.create(article)
  return result._id
}

export async function getAuthor(author) {
  const query = `
        *[
        _type == "author" && name == $author
        ]{name, _id}
    `
  const result = await client.fetch(query, {author})
  return result
}

export async function getCategory(list) {
  const query = `
        *[
            _type == "category" && name in $list
        ]{name, _id}
    `
  const result = await client.fetch(query, {list})
  return result
}
