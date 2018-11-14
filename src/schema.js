import fs from "fs"
import neo4jgraphql from "neo4j-graphql-js"
import path from "path"

export const typeDefs = fs.readFileSync(
    path.join(__dirname, "schema.graphql")
).toString("utf-8")

export const resolvers = {
    Query: {
        estadoByCodigo: neo4jgraphql
    }
}
