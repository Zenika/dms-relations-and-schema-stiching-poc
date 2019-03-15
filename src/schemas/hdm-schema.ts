import { makeExecutableSchema } from "graphql-tools";

// Just an example based on the Humeur du mois app but without being anonymous

type Vote = {
  id: number;
  value: string;
  employeeUUID: string;
};

const typeDefs = `
  type Vote {
      id: Int!
      value: String
      employeeUUID: String
  }
  type Query {
      votes: [Vote]
  }
`;

const votes: Vote[] = [
  {
    id: 1,
    value: "great",
    employeeUUID: "employeeUUID"
  },
  {
    id: 2,
    value: "notGreat",
    employeeUUID: "employeeUUID2"
  },
  {
    id: 3,
    value: "great",
    employeeUUID: "employeeUUID3"
  },
  {
    id: 4,
    value: "great",
    employeeUUID: "employeeUUID4"
  },
  {
    id: 5,
    value: "great",
    employeeUUID: "employeeUUID5"
  },
  {
    id: 6,
    value: "great",
    employeeUUID: "employeeUUID"
  },
  {
    id: 7,
    value: "great",
    employeeUUID: "employeeUUID3"
  },
  {
    id: 8,
    value: "great",
    employeeUUID: "employeeUUID4"
  }
];

const resolvers = {
  Query: {
    votes: () => votes
  }
};

const hdmSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export { hdmSchema, Vote };
