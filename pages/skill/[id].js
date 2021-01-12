import { useState } from 'react'
import { useRouter } from 'next/router'
import { map, join } from 'ramda'
import { idFetcher } from '../../utils/fetcher'
import useSWR from 'swr'
import styles from '../../styles/Skill.module.css'
import Link from 'next/link'

const SKILL_QUERY = `
  query SkillQuery($id: ID!) {
    skill(id: $id) {
      name
      id
      emoji
      modules {
        name
        subjects {
          name
          time
          links {
            href
            free
            referrer
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
            <div className={styles.card} onClick={() => setCurModule(module)}>
              <h2>{module.name}</h2>
              <p>
                {join(
                  ', ',
                  map(({ name }) => name, module.subjects),
                )}
              </p>
            </div>
          ),
          modules || [],
        )}
      </div>
      {curModule.name && (
        <div className={styles.module}>
          {map(
            ({ name, time, links }) => (
              <div key={name} className={styles.subject}>
                <h4>{name}</h4>
                <p>{time ? `${time} min` : ''}</p>
                {map(
                  ({ href, free, referrer }) => (
                    <a target="_blank" href={href}>
                      <p>{`Udemy${free ? ' - free' : ''}`}</p>
                    </a>
                  ),
                  links || [],
                )}
              </div>
            ),
            curModule.subjects,
          )}
        </div>
      )}
    </div>
  )
}

export default Skill
