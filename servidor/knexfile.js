// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: "pg",
  connection: {
    database: "7Mares",
    user: "postgres",
    password: "root",
  },
};
