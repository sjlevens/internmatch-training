import { find, propEq } from 'ramda'
import skills from '../../db/skills'

const skillResolver = (parent, args, context, info) => find(propEq('id', args.id), skills)

export default skillResolver
