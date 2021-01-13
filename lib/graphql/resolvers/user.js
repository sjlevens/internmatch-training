import { find, propEq } from 'ramda'
import users from '../../db/users'

const userResolver = (parent, args, context, info) => find(propEq('id', args.id), users)

export default userResolver
