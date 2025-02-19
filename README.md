# GraphQL API with Express and Mongoose

This project implements a GraphQL API using Express, Mongoose (for MongoDB interaction), and TypeScript.  It defines a schema for managing user data.

## Features

*   **User Management:**  Allows creation, retrieval, updating, and deletion of users.
*   **GraphQL Schema:**  Defines the structure of the API using GraphQL schema language.
*   **Express Server:** Serves the GraphQL API.
*   **Mongoose:**  Provides an object-modeling tool for interacting with MongoDB.

## Schema Definition

The GraphQL schema is defined in `typeDefs`:

```graphql
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


    User Type: Represents a user with id, name, email, password, and createdAt fields.
    UserInput Type: An input type for creating and updating users.
    Query Type: Defines the queries available:
        user(ID: ID!): Retrieves a user by ID.
        getUsers(amount: Int): Retrieves a list of users, optionally limiting the number of returned users.
    Mutation Type: Defines the mutations available:
        createUser(UserInput: UserInput): Creates a new user.
        deleteUser(ID: ID!): Deletes a user by ID.
        updateUser(ID: ID!, UserInput: UserInput): Updates a user by ID.

Prerequisites

    Node.js and npm (or yarn): Ensure you have Node.js and npm (or yarn) installed on your system. A recent LTS version is recommended.
    MongoDB: A running MongoDB instance is required. You can run it locally or use a cloud-based MongoDB service (e.g., MongoDB Atlas).

Installation

    Clone the repository:

          

git clone <repository_url>  # Replace <repository_url> with the actual URL
cd <project_directory>      # Replace <project_directory> with the project directory

Install dependencies:

      

npm install  # or yarn install

Configuration

    Database Connection: The connection string to your MongoDB database is typically configured within the code, likely in a file like index.ts or a dedicated configuration file. Ensure that this connection string is correctly pointing to your MongoDB instance. Update the connection string based on your MongoDB setup (local or cloud).

Running the Application

    Start the server:

          

npm start  # or yarn start

    This command will execute the index.ts file, starting the Express server and GraphQL endpoint.

Testing

You can test the API using a GraphQL client such as:

    GraphQL Playground: (If included in the setup) Access the playground by navigating to a specific URL in your browser (e.g., http://localhost:3000/graphql).
    Postman: Create GraphQL requests in Postman.
    Insomnia: Another popular API client.

Example Queries/Mutations

    Get a user by ID:

          

query {
  user(ID: "64f1234567890123456789ab") { # Replace with a valid user ID
    id
    name
    email
  }
}
Get a list of users:

      

query {
  getUsers(amount: 5) {  # Retrieves the first 5 users
    id
    name
    email
  }
}

Create a new user:

      

mutation {
  createUser(UserInput: {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123"
  }) {
    id
    name
    email
  }
}Update a user:

      

mutation {
  updateUser(ID: "64f1234567890123456789ab", UserInput: {
    name: "Updated Name",
    email: "updated.email@example.com"
  })
}Delete a user:

      

mutation {
  deleteUser(ID: "64f1234567890123456789ab") # Replace with a valid user ID
}
