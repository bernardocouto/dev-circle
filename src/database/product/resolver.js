import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'
import { neo4jgraphql } from 'neo4j-graphql-js'

const pubSub = new RedisPubSub({
    publisher: new Redis({
        port: 6379,
        host: process.env.REDIS_URI
    }),
    subscriber: new Redis({
        port: 6379,
        host: process.env.REDIS_URI
    })
})

const CREATE_PRODUCT = 'CREATE_PRODUCT'

export default {

    Mutation: {
        CreateProduct: async (object, args, context, info) => {
            const result = await neo4jgraphql(object, args, context, info)
            pubSub.publish(CREATE_PRODUCT, {
                createProduct: args
            })
            return result
        }
    },
    Query: {
        GetProductById: neo4jgraphql
    },
    Subscription: {
        createProduct: {
            subscription: () => pubSub.asyncIterator([CREATE_PRODUCT])
        }
    }

}
