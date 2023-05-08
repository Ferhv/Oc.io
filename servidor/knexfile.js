// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: "pg",
  connection: {
    database: "oc.io_2023",
    user: "postgres",
    password: "root",
  },
};
