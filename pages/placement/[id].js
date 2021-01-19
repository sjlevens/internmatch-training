import { useRouter } from 'next/router'
import { map, join, prop } from 'ramda'
import { idFetcher } from '../../utils/fetcher'
import useSWR from 'swr'
import styles from '../../styles/Placement.module.css'
import Link from 'next/link'

const PLACEMENT_QUERY = `
  query PlacementQuery($id: ID!) {
    placement(id: $id) {
      name
      id
      studies {
        id
        name
        learnings {
          name
          id
          links {
            href
            free
            referrer
            id
          }
        }
      }
    }
  }`

const Placement = () => {
  const router = useRouter()
  const { id, study } = router.query

  const { data, error } = useSWR([PLACEMENT_QUERY, id], idFetcher)

  const placement = data?.placement

  if (!placement)
    return (
      <div className={styles.container}>
        <Link href={'/'}>
          <p className={styles.link}>⇠ Back to home</p>
        </Link>
      </div>
    )

  const { name, studies } = placement

  return (
    <div className={styles.container}>
      <Link href={'/'}>
        <p className={styles.link}>⇠ Back to home</p>
      </Link>
      <h1>{name}</h1>
      <div>
        {map(
          ({ name, learnings, id }) => (
            <div key={id}>
              <h4>{`${name}`}</h4>
              {map(
                ({ name }) => (
                  <p>{name}</p>
                ),
                learnings || [],
              )}
            </div>
          ),
          studies || [],
        )}
      </div>
    </div>
  )
}

export default Placement
