import { useState } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { map, join, prop } from 'ramda'
import fetcher, { idFetcher } from '../utils/fetcher'
import SearchResults from '../components/search-results'

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

const USER_QUERY = `
query UserQuery($id: ID!) {
  user(id: $id) {
    name
    id
    completions {
      type_id
      type
    }
  }
}`

const Home = () => {
  const { data, error } = useSWR(SKILLS_QUERY, fetcher)
  const userId = 'sam'
  const { data: userData, error: userError } = useSWR([USER_QUERY, userId], idFetcher)
  const userName = userData?.user?.name

  const skills = data?.skills || []

  return (
    <div className={styles.container}>
      <Head>
        <title>Internmatch Training</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to InternMatch Training!</h1>
        {userName ? (
          <div className={styles.connect}>
            <p>{`Welcome Back ${userName}`}</p>
          </div>
        ) : (
          <Link href="">
            <div className={styles.connect}>
              <p>Connect to your InternMatch account</p>
              <p>to receive credit and track your progress</p>
              <span>⚡</span>
            </div>
          </Link>
        )}

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
        <SearchResults />
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
