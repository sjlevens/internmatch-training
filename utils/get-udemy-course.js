import axios from 'axios'
import { UDEMY_AUTH } from '../secrets'
const getUdemyCourse = async id => {
  const request = new Request(`https://www.udemy.com/api-2.0/courses/${id}/`, {
    header: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: UDEMY_AUTH,
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
