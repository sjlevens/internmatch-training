// import { UDEMY_AUTH, UDEMY_API } from '../secrets'
const getUdemyCourse = async id => {
  const request = new Request(`${process.env.UDEMY_API || 'UDEMY_API'}${id}/`, {
    header: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: process.env.UDEMY_AUTH || 'UDEMY_AUTH',
    },
  })

  let resp

  try {
    resp = await fetch(request)
    return resp.json()
  } catch (err) {
    console.error(err)
    return {}
  }
}

export default getUdemyCourse
