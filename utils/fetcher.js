const fetcher = (query, search) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { filter: search } }),
  })
    .then(res => res.json())
    .then(json => json.data)

const idFetcher = (query, id) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { id } }),
  })
    .then(res => res.json())
    .then(json => json.data)

export default fetcher
export { idFetcher }
