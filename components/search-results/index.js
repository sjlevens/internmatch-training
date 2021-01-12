import { map } from 'ramda'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import Link from 'next/link'
import styles from '../../styles/SearchResults.module.css'

const SearchResults = ({ search, query }) => {
  const { data, errors } = useSWR([query, search], fetcher)

  const placements = data?.placements || []

  return (
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
                studies || [],
              )}
            </div>
          </Link>
        ),
        placements || [],
      )}
    </div>
  )
}

export default SearchResults
