"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Ticket extends Model {
  /**
   * A ticket belongs to a category
   */
  category() {
    return this.belongsTo("App/Models/Category");
  }

  /**
   * A ticket can have many comments
   */
  comments() {
    return this.hasMany("App/Models/Comment");
  }

  /**
   * A ticket belongs to a user
   */
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Ticket;
