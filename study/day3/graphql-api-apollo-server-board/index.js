import {ApolloServer} from '@apollo/server' 
import { startStandaloneServer } from '@apollo/server/standalone'
import express from 'express'
import {checkValidationPhone, getToken, sendSMS} from './phone.js'



const typeDefs = `#graphql
  type Board {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards: [Board]
  }

  input CreateBoardInput {
    writer: String, 
    title: String, 
    contents: String
  }

  type Mutation {
    createBoard(createBoardInput: CreateBoardInput!): String
  }

  type Mutation {
    createTokenPhone(myphone: String): String
  }
`;

const result = [
  { number: 1, writer: "철수", title: "제목없슴", contents: "내용"},
  { number: 2, writer: "영희", title: "제목영희", contents: "영희의 내용"},
  { number: 3, writer: "만두", title: "제목만두", contents: "만두의 내용"},
];

const resolvers = {
  Query: {
   fetchBoards: () => result
  },

  Mutation: {
    createBoard: ( _, args) => {
      console.log(args.createBoardInput.writer)
      console.log(args.createBoardInput.title)
      console.log(args.createBoardInput.contents)


      return "게시물을 등록했습니다"
    },

    createTokenPhone: (_, args) => {
      console.log(args.myphone)
      const isValid = checkValidationPhone(args.myphone)
      if (isValid === true ) {
        const token = getToken(6);
        
        sendSMS(args.myphone, token)
        return "인증완료"
      } else {
        return "핸드폰 번호를 다시 확인하세요"
      }
    }
  }

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`🚀  프로그램 성공 Server ready at: ${url}`);