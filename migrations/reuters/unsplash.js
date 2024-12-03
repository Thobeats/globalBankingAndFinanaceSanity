import { createApi } from "unsplash-js";
import {configDotenv} from 'dotenv'
configDotenv()



const unsplash = createApi({
    accessKey: process.env.unsplash,
});

export async function getUnsplashPhotos()
{
    const res = await unsplash.photos.getRandom({count: 5});
    return res.response;
}

export async function searchUnsplashPhotos(query)
{
    const res = await unsplash.search.getPhotos({query, perPage: 5});
    return res.response;
}