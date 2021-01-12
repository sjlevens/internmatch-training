import Fuse from 'fuse.js'
import { map, prop } from 'ramda'
import placements from '../../db/placements'

const placementsResolver = (parent, args, context, info) => {
  if (!args.filter) return placements

  const fuse = new Fuse(placements, {
    threshold: 0.4,
    shouldSort: false,
    keys: ['name', 'studies.name'],
  })

  return map(prop('item'), fuse.search(args.filter))
}

export default placementsResolver
