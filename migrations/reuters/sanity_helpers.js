import { createClient } from '@sanity/client';
import {configDotenv} from 'dotenv'
import { Readable } from 'stream';
configDotenv()


const client = createClient({
    "projectId": "v0gkry1w",
    "dataset": "production",
    "useCdn": true,
    "apiVersion": new Date().toISOString().split('T')[0],
    "token": process.env.token
});

// const client2 = createClient({
//     "projectId": "v0gkry1w",
//     "dataset": "new_content1",
//     "useCdn": true,
//     "apiVersion": new Date().toISOString().split('T')[0],
//     "token": process.env.token
// });

export async function createReuterPost(post)
{
    const result = await client.create(post);
    return result._id;
}

export async function createArticle(article)
{
    const result = await client.create(article);
    return result._id;
}

export async function getAuthor(author)
{
    const query = `
        *[
        _type == "author" && name == $author
        ]{name, _id}
    `;
    const result = await client.fetch(query, {author});
    return result;
}

export async function getCategory(list)
{
    const query = `
        *[
            _type == "category" && name in $list
        ]{name, _id}
    `;
    const result = await client.fetch(query, {list});
    return result;
}

export async function getPost(category)
{
    const query = `
        *[
            _type == "post" && category == $category
        ]
    `;
    const result = await client.fetch(query, {category});
    return result;
}

export async function deletePost()
{
    client.delete({
        query: `*[
            _type == "article"
        ]`
    }).then((res) => {
        client.delete({query: `*[
            _type == "post" && author._ref == "8f309a69-87d5-49ff-8b25-962023943f4e"
        ]`});
    });

    
}


export async function uploadImage(url, filename)
{
    const image = await fetch(url);

    const buffer = await image.arrayBuffer();
    const readableStream = Readable.from(Buffer.from(buffer));

    const result = await client.assets.upload('image', readableStream, {
        filename
    });
    return result;
}