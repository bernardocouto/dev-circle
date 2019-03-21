import { schema } from './database/schema'

import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv'
import { v1 as neo4j } from 'neo4j-driver'

dotenv.config()

const driver = neo4j.driver(
    `bolt://${process.env.NEO4J_URI}:7687`,
    neo4j.auth.basic(
        'neo4j',
        null
    )
)

const server = new ApolloServer({
    context: ({ req }) => {
        try {
            return Object.assign({
                driver,
                req
            })
        } catch (error) {
            console.error(error)
        }
    },
    introspection: true,
    playground: true,
    schema: schema
})

server.listen(4000, '0.0.0.0').then(({ url }) => 
    console.log(`GraphQL API ready at ${url}`)
)
