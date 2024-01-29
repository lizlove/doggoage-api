const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This 'Size' type can be one of 5 values: xs, sm, md, lg, xl.
  # TODO: Add information on sizing
  enum Size {
    xs, sm, md, lg, xl
  }

  # This "DogAge" type defines the queryable fields: 'dogAge', 'size', and 'humanAge'. 
  # The latter two are optional.
  # All ages are in MONTHS.
  # Default dog size is MEDIUM (md).
  type Dog {
    dogAge!: Number
    humanAge: Number
    size: Size
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "humanage" query returns an Age object with conversions.
  type Query {
    dog: Dog
  }
`;

const dogs = [
  {
    dogMonths: 24,
    size: xs
  },
  {
    dogMonths: 36,
    size: sm
  },
  {
    dogMonths: 40,
    size: md
  },
  {
    dogMonths: 45,
    size: lg
  },
  {
    dogMonths: 8,
    size: xl
  },
];

const resolvers = {
  Query: {
    dog: () => dogs[0],
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(` 🐶🐶🐶 Doggoage server ready at ${url}`);
});