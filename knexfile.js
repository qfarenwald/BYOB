module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/legos',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
