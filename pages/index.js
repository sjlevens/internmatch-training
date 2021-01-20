import { useState, useEffect } from 'react'
import initFirebase from '../utils/auth/initFirebase'
import FirebaseAuth from '../components/FirebaseAuth'

import Head from 'next/head'
import useSWR from 'swr'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { map, join, prop } from 'ramda'
import fetcher, { idFetcher } from '../utils/fetcher'
import SearchResults from '../components/search-results'
import LastCompleted from '../components/last-completed'
import { useUser } from '../utils/auth/useUser'

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

// Init the Firebase app.
initFirebase()

const Home = () => {
  const { data, error } = useSWR(SKILLS_QUERY, fetcher)
  const { user, logout } = useUser()
  const { email, completions, displayName } = user || {}

  const skills = data?.skills || []

  console.log(user)

  return (
    <div className={styles.container}>
      <Head>
        <title>Internmatch Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to InternMatch Academy!</h1>
        {email ? (
          <div onClick={logout}>
            <div className={styles.connect}>
              <p>{`Welcome Back ${displayName}`}</p>
            </div>
          </div>
        ) : (
          <div className={styles.connect}>
            <p>Sign In</p>
            <p>to receive credit and track your progress</p>
            <FirebaseAuth />
            <span>⚡</span>
          </div>
        )}
        <div className={styles.grid}>
          {map(
            ({ name, modules, emoji, id }) => (
              <Link href={`/skill/${id}`} key={id}>
                <div className={styles.card}>
                  <h3>{`${name} ${emoji}`}</h3>
                  {/* {userSkills ? (
                    <p className={styles.completed}>
                      {userSkills[id] ? `${userSkills[id]}% Completed!` : `Not started yet`}
                    </p>
                  ) : null} */}
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
        <a href="https://outcome.life/" target="_blank">
          <img src="/outcome_life.svg" alt="Outcome Life Logo" className={styles.logo} />
        </a>
      </div>
    </div>
  )
}

export default Home
