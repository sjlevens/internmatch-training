import { useRouter } from 'next/router'

const Placement = () => {
  const router = useRouter()
  const { id, study } = router.query

  return <h6>{id + study}</h6>
}

export default Placement
