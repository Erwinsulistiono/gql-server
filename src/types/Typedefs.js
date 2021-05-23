const { gql } = require("apollo-server");

module.exports = gql`
  type Call {
    id: ID!
    to: To
    from: From
    type: String!
    status: String!
    endTime: String!
    orgUuid: String!
    txnUuid: String!
    startTime: String!
    answerTime: String
    webhookCode: String
    durationInMinutes: String
    durationInSeconds: String
  }

  type To {
    key: String
    label: String
    number: String
  }

  type From {
    key: String
    label: String
    number: String
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input InputTo {
    key: String
    label: String
    number: String
  }

  input InputFrom {
    key: String
    label: String
    number: String
  }

  input CreateCall {
    to: InputTo
    from: InputFrom
    type: String!
    status: String!
    endTime: String!
    orgUuid: String!
    txnUuid: String!
    startTime: String!
    answerTime: String
    webhookCode: String
    durationInMinutes: String
    durationInSeconds: String
  }

  type Query {
    calls: [Call]
    call(callId: ID!): Call
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createCall(call: CreateCall): Call!
  }
`;
