import mutations from "./mutations"

import InMemoryCache from "apollo-cache-inmemory"
import ApolloClient from "apollo-client"
import HttpLink from "apollo-link-http"
import dotenv from "dotenv"
import gql from "graphql-tag"

dotenv.config()

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: process.env.GRAPHQL_URI, fetch })
})

client.mutate({
    mutation: gql(mutations)
}).then(data => console.log(data)).catch(error => console.error(error))
