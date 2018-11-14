import { ApolloServer, makeExecutableSchema } from "apollo-server"
import { v1 as neo4j } from "neo4j-driver"

import { resolvers, typeDefs } from "./schema"

import augmentSchema from "neo4j-graphql-js"
import dotenv from "dotenv"

dotenv.config()

const schema = makeExecutableSchema({
    resolvers,
    typeDefs
})

const augmentedSchema = augmentSchema(schema)

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(
        process.env.NEO4J_USER,
        process.env.NEO4J_PASSWORD
    )
)

const server = ApolloServer({
    context: { driver },
    schema: augmentedSchema
})

server.listen(process.env.GRAPHQL_PORT, "0.0.0.0").then(({ url }) => 
    console.log("")
)
