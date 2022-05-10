export = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['./src/infra/database/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/infra/database/typeorm/migrations/',
  },
  entities: ['./src/infra/database/typeorm/entities/*.ts'],
};
