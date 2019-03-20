import { makeExecutableSchema } from 'apollo-server'

const mutation = `
    type Mutation {

    }
`

const query = `
    type Query {

    }
`

const subscription = `
    type Subscription {

    }
`

const resolver = {
    Mutation: Object.assign(),
    Query: Object.assign(

    ),
    Subscription: Object.assign()
}

const schema = makeExecutableSchema({
    typeDefs: [
        mutation,
        query,
        subscription
    ]
})

export { resolver, schema }
