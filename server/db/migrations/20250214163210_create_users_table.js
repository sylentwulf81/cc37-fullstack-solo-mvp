/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("password_hash").notNullable();
    table.timestamps(true, true); // adds created_at and updated_at automatically
  });
};
 
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
