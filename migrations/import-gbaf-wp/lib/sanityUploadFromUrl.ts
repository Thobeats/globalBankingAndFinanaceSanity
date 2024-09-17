import { Readable } from 'stream';
import { SanityClient, SanityImageAssetDocument, UploadClientConfig } from '@sanity/client';

export async function sanityUploadFromUrl(
  url: string,
  client: SanityClient,
  metadata: UploadClientConfig,
): Promise<SanityImageAssetDocument | null> {
  const response = await fetch(url);
  if (!response.body) {
    throw new Error(`No body found for ${url}`);
  }

  const buffer = await response.arrayBuffer();
  const readableStream = Readable.from(Buffer.from(buffer));

  let data: SanityImageAssetDocument | null = null;
  try {
    data = await client.assets.upload('image', readableStream, metadata);
  } catch (error) {
    console.error(`Failed to upload image from ${url}`);
    console.error(error);

    return null;
  }

  return data;
}
