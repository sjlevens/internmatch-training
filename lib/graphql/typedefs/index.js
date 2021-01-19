import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    skills: [Skill]
    placements(filter: String!): [Placement]
    skill(id: ID!): Skill
    user(id: ID!): User
    placement(id: ID!): Placement
  }
  type Skill {
    id: ID!
    name: String
    emoji: String
    modules: [Module]
  }
  type Module {
    name: String
    id: ID!
    subjects: [Subject]
  }
  type Subject {
    id: ID!
    name: String
    time: Int
    links: [Link]
  }
  type Link {
    free: Boolean
    href: String
    referrer: String
    id: ID!
  }
  type Placement {
    id: ID!
    name: String
    studies: [Study]
  }
  type Study {
    id: ID!
    name: String
    learnings: [Learning]
  }
  type Learning {
    id: ID!
    name: String
    links: [Link]
  }
  type User {
    id: ID!
    name: String
    completions: [Completion]
    skills: UserSkills
  }
  type UserSkills {
    interpersonal: Int
    technical: Int
  }
  type Completion {
    type: CompletionType
    type_id: ID!
    amount: Int
    completed_at: String
  }
  enum CompletionType {
    SKILL
    PLACEMENT
    MODULE
    SUBJECT
    STUDY
  }
`

export default typeDefs
