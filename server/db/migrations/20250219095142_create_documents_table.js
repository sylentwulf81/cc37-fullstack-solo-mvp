/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("documents", (table) => {
    table.increments("id").primary();
    table.string("body_content").notNullable();
    table.timestamps(true, true); // adds created_at and updated_at automatically
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("documents");
};
