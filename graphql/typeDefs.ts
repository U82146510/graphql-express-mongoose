import {gql} from 'graphql-tag';

export const typeDefs = gql`
    type User{
        id:ID!
        name:String
        email:String
        password:String
        createdAt:String
    }
    input UserInput{
        name:String
        email:String
        password:String
    }
    type Query{
        user(ID:ID!):User!
        getUsers(amount:Int):[User]
    } 
    type Mutation{
        createUser(UserInput:UserInput):User!
        deleteUser(ID:ID!):Boolean
        updateUser(ID:ID!,UserInput:UserInput):Boolean
    }
`