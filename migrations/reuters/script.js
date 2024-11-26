const getAccessToken = async function () {
  try {
    const res = await fetch('https://auth.thomsonreuters.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: 'AvdEbrqSsgbdaL3kSK9wW2v6RoXx8ue5',
        client_secret: 'mVggptsrcr3eEIeE1DD_9IjN7btiMSMf7mp31zV35naCZHJ7G-ENwIrwukOYLAsW',
        grant_type: 'client_credentials',
        audience: '7a14b6a2-73b8-4ab2-a610-80fb9f40f769',
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

