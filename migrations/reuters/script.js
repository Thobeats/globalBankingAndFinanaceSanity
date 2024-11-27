import {configDotenv} from 'dotenv'
configDotenv()

export const getAccessToken = async function () {
  try {
    const res = await fetch('https://auth.thomsonreuters.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        grant_type: 'client_credentials',
        audience: process.env.audience,
        scope:
          'https://api.thomsonreuters.com/auth/reutersconnect.contentapi.read https://api.thomsonreuters.com/auth/reutersconnect.contentapi.write',
      }),
    })

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    const data = await res.json()
    return data.access_token
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getCategoryItems = async function (accessToken) {
  if (typeof accessToken !== 'string') console.error('Bad Request')

  const query = `{
    search(filter: {namedQueries: {filters: "cat://bus"}}, sort: {direction: DESC, field: CONTENT_TIMESTAMP}, limit: 100)
    {
      totalHits
      items {
      headLine 
      versionedGuid
      contentTimestamp,
      }
    }
  }`

  try {
    const res = await fetch('https://api.reutersconnect.com/content/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({query}),
    })

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    const data = await res.json()

    // console.log('Full response data:', JSON.stringify(data, null, 2))

    if (!data.data || !data.data.search || !data.data.search.items) {
      throw new Error('The expected data structure is not present in the response')
    }

    return data.data.search.items
  } catch (error) {
    throw new Error(error.message)
  }
}

const fetchItemContent = async function (versionedGuid, accessToken) {
  const query = `{
    item(id: "${versionedGuid}") {
      headLine,
      bodyXhtml,
      fragment,
      slug,
      pubStatus,
      type,
      uri,
      versionedGuid
      renditions {
        mimeType
        uri
        type
        version
        code
        points }
    }
  }`

  try {
    const res = await fetch('https://api.reutersconnect.com/content/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({query}),
    })

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    const data = await res.json()
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}

const getAllItemContents = async function (items, accessToken) {
  const fetchPromises = items.map((item) => fetchItemContent(item?.versionedGuid, accessToken))
  const contents = await Promise.all(fetchPromises)

  const itemContents = contents
    .filter((content) => content?.data?.item?.bodyXhtml !== null)
    .map((content) => content?.data?.item)

  console.log(itemContents)
  return itemContents
}

await getAllItemContents(item, token)
