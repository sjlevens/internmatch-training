import { ApolloServer, gql } from 'apollo-server-micro'
import skills from '../../lib/db/skills'
import placementsResolver from '../../lib/graphql/resolvers/placements'
import skillResolver from '../../lib/graphql/resolvers/skill'

const typeDefs = gql`
  type Query {
    skills: [Skill]
    placements(filter: String!): [Placement]
    skill(id: ID!): Skill
  }
  type Skill {
    id: String
    name: String
    emoji: String
    modules: [Module]
  }
  type Module {
    name: String
    subjects: [Subject]
  }
  type Subject {
    name: String
    time: Int
    links: [Link]
  }
  type Link {
    free: Boolean
    href: String
    referrer: String
  }
  type Placement {
    name: String
    id: String
    studies: [Study]
  }
  type Study {
    name: String
  }
`

const resolvers = {
  Query: {
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
