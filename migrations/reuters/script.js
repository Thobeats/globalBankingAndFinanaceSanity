import dotenv from 'dotenv'
const getAccessToken = async function () {
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
    const data = await res.json()
    console.log(data)
    return data.access_token
  } catch (error) {
    throw new Error(error.message)
  }
}

const token = await getAccessToken()

export const getCategoryItems = async function(accessToken) {
  if (typeof accessToken !== 'string') console.error('Bad Request')

  const query = `{
    search(filter: {
    namedQueries: {filters: "cat://bus"}}, 
    sort: {direction: DESC, field: CONTENT_TIMESTAMP}, limit: 100)
    {
      totalHits
      item {
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
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    })

    if (!res.ok) throw new Error('The network is bad')

    const data = await res.json()

    console.log(data)
    return data.data.search.items
  } catch (error) {
    throw new Error(error.message)
  }
}

const item = await getCategoryItems(token)

const fetchItemContent = async function(versionedGuid, accessToken) {
  const query = `{
    item(id: '${versionedGuid}) {
      headLine,
      bodyXhtml,
      uri,
      versionedGuid
    }
  }`

  try {
    const res = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({ query })
    })

    const data = await res.json()
    console.log(data)
  } catch (error) {
    throw new Error(error.message)
  }
}