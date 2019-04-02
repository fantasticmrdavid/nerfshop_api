const { Client } = require('pg');

const fs = require('fs');
const path = require('path');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

const { resolvers } = require(path.join(__dirname, 'resolvers.js'));
const schema = makeExecutableSchema({ typeDefs, resolvers });

const start = async () => {
  const pgClient = new Client('postgresql://localhost:5432/fantasticmrdavid');
  await pgClient.connect();

  var app = express();
  app.use('/api', graphqlHTTP({
      schema: schema,
      graphiql: true,
      context: { pgClient },
  }));
  app.listen(4000);
  console.log('Running NerfShop API server at localhost:4000/api');
};

start();
