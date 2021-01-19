import { useState } from 'react'
import { map, slice, length } from 'ramda'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import Link from 'next/link'
import styles from './SearchResults.module.css'

const PLACEMENT_SEARCH_QUERY = `
  query PlacementSearchQuery($filter: String!) {
    placements(filter: $filter) {
      name
      id
      studies {
        name
      }
    }
  }`

const SearchResults = () => {
  const [search, setSearch] = useState('')
  const { data, errors } = useSWR([PLACEMENT_SEARCH_QUERY, search], fetcher)

  const placements = data?.placements || []

  return (
    <>
      <input
        onChange={e => setSearch(e.target.value)}
        className={styles.search}
        type="text"
        placeholder="Search for a topic..."
      />
      <div className={styles.container}>
        {map(
          ({ name, studies, id }) => (
            <Link href={`/placement/${id}`} key={id}>
              <div className={styles.card}>
                <h6>{name}</h6>
                {map(
                  ({ name: studyName }) => (
                    <Link
                      href={{ pathname: `/placement/${id}`, query: { study: studyName } }}
                      key={id + studyName}
                    >
                      <p>{studyName}</p>
                    </Link>
                  ),
                  slice(0, 4, studies || []),
                )}
                {length(studies) > 5 && (
                  <Link href={`/placement/${id}`}>
                    <p>{`see more...`}</p>
                  </Link>
                )}
              </div>
            </Link>
          ),
          placements || [],
        )}
      </div>
    </>
  )
}

export default SearchResults
