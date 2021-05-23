const connectDb = require("./config/db");
connectDb();

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./types");
const resolvers = require("./resolvers");
const models = require("./models");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: { models },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
