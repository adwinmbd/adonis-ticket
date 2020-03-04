"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Admin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    // call next to advance the request
    // call next to advance the request
    await auth.check();
    if (auth.user.is_admin !== 1) {
      response.redirect("/home");
    }
    await next();
  }
}

module.exports = Admin;
