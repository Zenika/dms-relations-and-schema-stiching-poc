import { makeExecutableSchema } from "graphql-tools";

// Just an example based on the GraphQBeez app

type Employee = {
  uuid: string;
  firstName: string;
  lastName: string;
};

const typeDefs = `
  type Employee {
      uuid: String!
      firstName: String!
      lastName: String!
  }

  type Query {
      employees: [Employee]
      employee(uuid: String!): Employee
  }
`;

const employees: Employee[] = [
  {
    uuid: "an uuid",
    firstName: "Clément",
    lastName: "Fassot"
  }
];

const resolvers = {
  Query: {
    employees: () => employees,
    employee: (uuid: string) =>
      employees.find((employee: Employee) => employee.uuid === uuid)
  }
};

export const employeeSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});
