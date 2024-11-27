const cron = require('node-cron');
const {createClient} = require('@sanity/client');

const client = createClient({
    "projectId": "v0gkry1w",
    "dataset": "new_content1",
    "useCdn": true,
    "apiVersion": new Date().toISOString().split('T')[0]
});

async function createReuterPost(post)
{
    const result = await client.create(post);
    return result._id;
}

async function createArticle(article)
{
    const result = await client.create(article);
    return result._id;
}

cron.schedule('* * * * *', () => {
    
});