"use strict";

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Category = use("App/Models/Category");

class CategorySeeder {
  async run() {
    const categories = [
      {
        name: "Technical",
        created_at: "2017-03-07 00:00:00",
        updated_at: "2017-03-07 00:00:00"
      },
      {
        name: "Sales",
        created_at: "2017-03-07 00:00:00",
        updated_at: "2017-03-07 00:00:00"
      }
    ];
    await Category.createMany(categories);
  }
}

module.exports = CategorySeeder;
