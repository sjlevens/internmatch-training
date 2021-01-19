import { useEffect, useState } from 'react'
import getUdemyCourse from '../../utils/get-udemy-course'
import styles from './UdemyLink.module.css'

const UdemyLink = ({ id, free, href }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    const getUdemyData = async () => {
      const data = await getUdemyCourse(id)
      setData(data)
    }

    getUdemyData()
  }, [])

  const { image_480x270: image, title } = data

  return (
    <a href={href} target="_blank">
      <div className={styles.card}>
        <h5>{`${title || ''}${free ? ' - Free' : ''}`}</h5>
        <img src={image || '/loading_icon.gif'} alt={title} width={480} height={270} />
      </div>
    </a>
  )
}

export default UdemyLink
