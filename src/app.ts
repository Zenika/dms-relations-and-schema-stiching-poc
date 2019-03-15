import { ApolloServer, mergeSchemas } from "apollo-server";
import { employeeSchema, Employee } from "./schemas/employee-schema";
import { hdmSchema, Vote } from "./schemas/hdm-schema";
import { hdmEmployeeSchema } from "./schemas/hdm-employee-schema";
import { GraphQLSchema } from "graphql";
import util from "util";

const mergedSchemas: GraphQLSchema = mergeSchemas({
  schemas: [employeeSchema, hdmSchema, hdmEmployeeSchema],
  resolvers: {
    Vote: {
      employee: {
        fragment: `... on Vote { employeeUUID }`,
        resolve(vote: Vote, args, context, info) {
          return info.mergeInfo.delegateToSchema({
            schema: employeeSchema,
            operation: "query",
            fieldName: "employee",
            args: {
              uuid: vote.employeeUUID
            },
            context,
            info
          });
        }
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
