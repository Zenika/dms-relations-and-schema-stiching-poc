import { ApolloServer, mergeSchemas } from "apollo-server";
import { employeeSchema, Employee } from "./schemas/employee-schema";
import { hdmSchema, Vote } from "./schemas/hdm-schema";
import { hdmEmployeeSchema } from "./schemas/hdm-employee-schema";
import { GraphQLSchema, GraphQLResolveInfo } from "graphql";
import { createBatchResolver } from "graphql-resolve-batch";
import util from "util";

const mergedSchemas: GraphQLSchema = mergeSchemas({
  schemas: [employeeSchema, hdmSchema, hdmEmployeeSchema],
  resolvers: {
    Vote: {
      employee: {
        fragment: `... on Vote { employeeUUID }`,
        resolve: createBatchResolver(
          async (sources, args, context, info: any) => {
            return info.mergeInfo.delegateToSchema({
              schema: employeeSchema,
              operation: "query",
              fieldName: "manyEmployees",
              args: { uuids: sources.map((vote: Vote) => vote.employeeUUID) },
              context,
              info
            });
          }
        )
      }
    }
  }
});

const server = new ApolloServer({
  schema: mergedSchemas,
  formatError: error => {
    console.error(util.inspect(error, false, null, true));
    return error;
  },
  formatResponse: (response: any) => {
    console.log(util.inspect(response, false, null, true));
    return response;
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
