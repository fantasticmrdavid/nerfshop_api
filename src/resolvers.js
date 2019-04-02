exports.resolvers = {
  Query: {
    search: (_, { type }, context) => context.pgClient
      .query(`SELECT * FROM products WHERE type = '${type}'`)
      .then(res => res.rows),
    product: (_, { id }, context) => context.pgClient
      .query(`SELECT * FROM products WHERE product_id = '${id}'`)
      .then(res => res.rows[0]),
  },
};
