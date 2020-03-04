"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TicketSchema extends Schema {
  up() {
    this.create("tickets", table => {
      table.increments();
      table.integer("user_id").unsigned();
      table.integer("category_id").unsigned();
      table.string("ticket_id").unique();
      table.string("title");
      table.string("priority");
      table.text("message");
      table.string("status");
      table.timestamps();
    });
  }

  down() {
    this.drop("tickets");
  }
}

module.exports = TicketSchema;
