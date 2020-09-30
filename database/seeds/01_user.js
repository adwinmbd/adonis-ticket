"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const User = use("App/Models/User");

class UserSeeder {
  async run() {
    const users = [
      {
        username: "admin",
        email: "admin@email.com",
        password: "adminwan",
        is_admin: 1,
      },
      {
        username: "lian",
        email: "lian@email.com",
        password: "lianwan",
      },
      {
        username: "binta",
        email: "binta@email.com",
        password: "bintawan",
      },
    ];
    await User.createMany(users);
  }
}

module.exports = UserSeeder;
