import Link from 'next/link'
import { sort, head } from 'ramda'
import styles from './LastCompleted.module.css'

const compareDates = (a, b) => new Date(a.completed_at) < new Date(b.completed_at)

const LastCompleted = ({ completions }) => {
  if (!completions.length) return null

  const lastCompletion = head(sort(compareDates, completions))

  return (
    <div className={styles.container}>
      <p>{`Last completed - ${lastCompletion.type_id}`}</p>
      <Link href={''}>
        <p className={styles.link}>{`Continue`}</p>
      </Link>
    </div>
  )
}

export default LastCompleted
