import {ApolloServer} from '@apollo/server' 
import { startStandaloneServer } from '@apollo/server/standalone'

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Query {
    hello: String
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
  Query: {
    hello: () => 'nice to meet you'
   
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀  프로그램 성공 Server ready at: ${url}`);