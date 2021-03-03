import { useState } from 'react'
import { useRouter } from 'next/router'
import { map, join, prop } from 'ramda'
import { idFetcher } from '../../utils/fetcher'
import useSWR from 'swr'
import styles from '../../styles/Skill.module.css'
import Link from 'next/link'
import UdemyLink from '../../components/udemy-link'

const SKILL_QUERY = `
  query SkillQuery($id: ID!) {
    skill(id: $id) {
      name
      id
      emoji
      modules {
        id
        name
        subjects {
          id
          name
          time
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

const Skill = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR([SKILL_QUERY, id], idFetcher)
  const [curModule, setCurModule] = useState({})

  const skill = data?.skill

  if (!skill) return <div></div>

  const { name, emoji, modules } = skill

  return (
    <div className={styles.container}>
      <Link href={'/'}>
        <p className={styles.link}>⇠ Back to home</p>
      </Link>
      <h1>{name}</h1>
      <p>{emoji}</p>
      <div className={styles.cards}>
        {map(
          module => (
            <div
              key={module.id + 'header'}
              className={styles.card}
              onClick={() => setCurModule(module)}
            >
              <h2>{module.name}</h2>
              <p>{join(', ', map(prop('name'), module.subjects))}</p>
            </div>
          ),
          modules || [],
        )}
      </div>
      {!curModule.name && <h5>Get started by choosing a module ⬆ </h5>}
      {curModule.name === 'Business Communication Software' && (
        <div className={styles.module}>
          {['google.png', 'microsoft.png', 'teams.png', 'zoom.png', 'slack.png'].map(img => (
            <img className={styles.image} src={`/${img}`} />
          ))}
        </div>
      )}
      <div>
        {map(
          ({ name, time, links, id }) => (
            <div key={id} className={styles.subject}>
              <h4>{`${name}${time ? ` - ${time} min` : ''}`}</h4>
              <p></p>
              {map(
                ({ href, free, id }) => (
                  <UdemyLink key={id} href={href} free={free} id={id} />
                ),
                links || [],
              )}
            </div>
          ),
          curModule.subjects || [],
        )}
      </div>
    </div>
  )
}

export default Skill
