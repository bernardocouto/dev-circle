import { resolver, schema } from './database/schema'

import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'
import mergeSchemas from 'graphql-tools'
import { v1 as neo4j } from 'neo4j-driver'
import augmentSchema from 'neo4j-graphql-js'

dotenv.config()

const augmentedSchema = augmentSchema(
    schema,
    {
        mutation: false,
        query: true
    }
)

const finalSchema = mergeSchemas({
    resolvers: [resolver],
    schemas: [augmentedSchema]
})

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(
        process.env.NEO4J_USER,
        process.env.NEO4J_PASSWORD
    )
)

const server = ApolloServer({
    context: { driver },
    introspection: true,
    playground: true,
    schema: finalSchema
})

server.listen(process.env.GRAPHQL_PORT, '0.0.0.0').then(({ url }) => 
    console.log(`GraphQL API ready at ${url}`)
)
