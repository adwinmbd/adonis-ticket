"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Category extends Model {
  /**
   * A category can have many tickets
   */
  tickets() {
    return this.hasMany("App/Models/Ticket");
  }
}

module.exports = Category;
