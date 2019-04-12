exports.resolvers = {
  Query: {
    search: (_, { type }, context) => context.pgClient
      .query(`SELECT * FROM products WHERE type = '${type}'`)
      .then(res => res.rows),
    product: (_, { id }, context) => context.pgClient
      .query(`SELECT * FROM products WHERE product_id = '${id}'`)
      .then(res => res.rows[0]),
    products: (_, __, context) => context.pgClient
      .query(`SELECT * FROM products`)
      .then(res => res.rows),
  },
  Product: {
    images: (product, _, context) => {
      return context.pgClient
        .query(`SELECT * FROM product_images WHERE product_id = '${product.product_id}'`)
        .then(res => res.rows.map(r => r.url));
      },
  },
};
