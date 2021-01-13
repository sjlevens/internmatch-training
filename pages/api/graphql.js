import { ApolloServer } from 'apollo-server-micro'
import { skills } from '../../lib/db'
import { placementsResolver, skillResolver, userResolver } from '../../lib/graphql/resolvers'
import typeDefs from '../../lib/graphql/typedefs'

const resolvers = {
  Query: {
    user: userResolver,
    skills: () => skills,
    placements: placementsResolver,
    skill: skillResolver,
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
