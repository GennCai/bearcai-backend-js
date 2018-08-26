import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { Prisma } from './generated/prisma'
import resolvers from './resolvers'


const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    }),
  }),
})
server.start({
  port: process.env.PORT
}, () => {
  console.log(`Server is running on http://localhost:${server.options.port}`)
  console.log(`PRISMA_ENDPOINT: ${process.env.PRISMA_ENDPOINT}`)
} )
