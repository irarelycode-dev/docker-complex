module.exports = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT,
  mongoURL:
    "mongodb+srv://irarelycode:irarelycode@cluster0.umaws.mongodb.net/fibbo?retryWrites=true&w=majority",
};
