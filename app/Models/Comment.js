"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Comment extends Model {
  /**
   * A comment belongs to a particular ticket
   */
  ticket() {
    return this.belongsTo("App/Models/Ticket");
  }

  /**
   * A comment belongs to a user
   */
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Comment;
