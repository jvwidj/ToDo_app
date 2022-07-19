/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todo').del()
  await knex('todo').insert([
    {description: 'To do 1'},
    {description: 'To do 2'},
    {description: 'To do 3'}
  ]);
};
