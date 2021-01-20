export const mapUserData = async user => {
  const { uid, email, photoURL, displayName } = user
  const token = await user.getIdToken(true)
  return {
    id: uid,
    email,
    token,
    photoURL,
    displayName,
  }
}
