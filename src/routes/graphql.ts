import { gql, ApolloServer } from "apollo-server-svelte-kit";

const users = [
  {
    name: "John Doe",
    age: 30,
  },
  {
    name: "Jessica Doe",
  },
];

const typeDefs = gql`
  type User {
    name: String!
    age: Int
  }

  type Query {
    allUsers: [User]!
  }
`;

const resolvers = {
  Query: {
    allUsers: async () => {
      return users;
    },
  }
};

const handler = async (req) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  await apolloServer.start();

  const resp = await apolloServer.handleRequest(req);
  apolloServer.stop();

  return resp;
};

export const head = handler;
export const get = handler;
export const post = handler;