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
      manyEmployees(uuids: [String]!): [Employee]
  }
`;

const employees: Employee[] = [
  {
    uuid: "employeeUUID",
    firstName: "Clément",
    lastName: "Fassot"
  },
  {
    uuid: "employeeUUID2",
    firstName: "Hugo",
    lastName: "Wood"
  },
  {
    uuid: "employeeUUID3",
    firstName: "Clément",
    lastName: "Van Peuter"
  },
  {
    uuid: "employeeUUID4",
    firstName: "Marina",
    lastName: "Blin"
  },
  {
    uuid: "employeeUUID5",
    firstName: "Jérémy",
    lastName: "Lejeune"
  }
];

const resolvers = {
  Query: {
    employees: () => employees,
    manyEmployees: (
      _: unknown,
      args: { uuids: string[] },
      context: unknown,
      info: unknown
    ) =>
      args.uuids.map(uuid =>
        employees.find((employee: Employee) => employee.uuid === uuid)
      ),
    employee: (
      _: unknown,
      args: { uuid: string },
      context: unknown,
      info: unknown
    ) => employees.find((employee: Employee) => employee.uuid === args.uuid)
  }
};

const employeeSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export { employeeSchema, Employee };
