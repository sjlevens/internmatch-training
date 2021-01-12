import { useState } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { map, join, prop } from 'ramda'
import fetcher from '../utils/fetcher'
import SearchResults from '../components/search-results'

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

const SKILLS_QUERY = `{
  skills {
    name
    emoji
    id
    modules {
      name
      subjects {
        name
      }
    }
  }
}`

const Home = () => {
  const [search, setSearch] = useState('')
  const { data, error } = useSWR(SKILLS_QUERY, fetcher)

  const skills = data?.skills || []

  return (
    <div className={styles.container}>
      <Head>
        <title>Internmatch Training</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to InternMatch Training!</h1>
        <Link href="">
          <div className={styles.connect}>
            <p>Connect to your InternMatch account</p>
            <p>to receive credit and track your progress</p>
            <span>⚡</span>
          </div>
        </Link>
        <div className={styles.grid}>
          {map(
            ({ name, modules, emoji, id }) => (
              <Link href={`/skill/${id}`} key={id}>
                <div className={styles.card}>
                  <h3>{`${name} ${emoji}`}</h3>
                  <p>{join(', ', map(prop('name'), modules || []))}</p>
                </div>
              </Link>
            ),
            skills,
          )}
        </div>
        <input
          onChange={e => setSearch(e.target.value)}
          className={styles.search}
          type="text"
          placeholder="Search for a topic..."
        />
        <SearchResults query={PLACEMENT_SEARCH_QUERY} search={search} />
      </main>
      <div className={styles.footer}>
        <a href="https://outcome.life/" target="_blank" rel="noopener noreferrer">
          <img src="/outcome_life.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </div>
    </div>
  )
}

export default Home
