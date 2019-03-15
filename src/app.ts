import { ApolloServer, mergeSchemas } from "apollo-server";
import { employeeSchema } from "./schemas/employee-schema";
import { hdmSchema } from "./schemas/hdm-schema";
import { GraphQLSchema } from "graphql";

const mergedSchemas: GraphQLSchema = mergeSchemas({
  schemas: [employeeSchema, hdmSchema]
});

const server = new ApolloServer({ schema: mergedSchemas });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
