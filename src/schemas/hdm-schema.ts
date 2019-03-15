import { makeExecutableSchema } from "graphql-tools";

// Just an example based on the Humeur du mois app but without being anonymous

type Vote = {
  id: number;
  value: string;
};

const typeDefs = `
  type Vote {
      id: Int!
      value: String
  }
  type Query {
      votes: [Vote]
  }
`;

const votes: Vote[] = [];

const resolvers = {
  Query: {
    votes: () => votes
  }
};

export const hdmSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});
