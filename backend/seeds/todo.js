/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todo').del()
  await knex('todo').insert([
    {user_id: 1, description:"first note"},
    {user_id: 1, description:"second note"},
    {user_id: 2, description:"third note"}
  ]);
};
