import { makeAugmentedSchema } from 'neo4j-graphql-js'

import category from './category'
import product from './product'

const mutations = `
    type Mutation {
        ${category.mutation}
        ${product.mutation}
    }
`

const queries = `
    type Query {
        ${category.query}
        ${product.query}
    }
`

const subscriptions = `
    type Subscription {
        ${product.subscription}
    }
`

const resolver = {
    Mutation: Object.assign(
        product.resolver.Mutation
    ),
    Query: Object.assign(
        category.resolver.Query
    ),
    Subscription: Object.assign(
        product.resolver.Subscription
    )
}

const schema = makeAugmentedSchema({
    config: {
        mutation: false,
        query: true
    },
    resolvers: resolver,
    typeDefs: [
        category.schema,
        product.schema,
        mutations,
        queries,
        subscriptions
    ].join('')
})

export { resolver, schema }
