import { find, propEq } from 'ramda'
import placements from '../../db/placements'

const placementResolver = (parent, args, context, info) => find(propEq('id', args.id), placements)

export default placementResolver
