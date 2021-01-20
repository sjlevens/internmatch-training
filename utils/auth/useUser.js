import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebaseApp from 'firebase/app'
import firebase from 'firebase'
import 'firebase/auth'
import initFirebase from '../auth/initFirebase'
import { removeUserCookie, setUserCookie, getUserFromCookie } from './userCookies'
import { mapUserData } from './mapUserData'

initFirebase()

const useUser = () => {
  const [user, setUser] = useState()
  const router = useRouter()

  const logout = async () => {
    return firebaseApp
      .auth()
      .signOut()
      .catch(e => {
        console.error(e)
      })
  }

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebaseApp.auth().onIdTokenChanged(async user => {
      if (user) {
        const userData = await mapUserData(user)
        setUserCookie(userData)
        setUser(userData)
      } else {
        removeUserCookie()
        setUser()
      }
    })

    const userFromCookie = getUserFromCookie()
    if (!userFromCookie) {
      router.push('/')
      return
    }

    // const setUpUser = async fromCookie => {
    //   const userRef = firebase.firestore().collection('users').doc(fromCookie.id)
    //   const userDoc = await userRef.get()
    //   const userData = userDoc.data()
    //   setUser({ ...fromCookie, ...userData })
    // }

    setUser(userFromCookie)

    return () => {
      cancelAuthListener()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, logout }
}

export { useUser }
