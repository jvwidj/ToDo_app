/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("todo", (table) => {
        table.increments().primary();
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");        
        table.string("description");
    
        table.timestamps(false, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("todo")
};
