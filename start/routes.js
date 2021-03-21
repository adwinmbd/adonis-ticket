"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("home").as("home");

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

Route.get("register", "AuthController.showRegisterPage");
Route.post("register", "AuthController.register").as("register");
Route.get("login", "AuthController.showLoginPage");
Route.post("login", "AuthController.login").as("login");
Route.get("logout", "AuthController.logout");

/*
|--------------------------------------------------------------------------
| Tickets Routes
|--------------------------------------------------------------------------
*/
// Route.get("new_ticket", "TicketsController.create").middleware("auth");
Route.get("new/ticket", "TicketsController.create").middleware("auth");
Route.post("new/ticket", "TicketsController.store").middleware("auth");
Route.get("user/tickets", "TicketsController.userTickets").middleware("auth");
Route.get("tickets/:ticket_id", "TicketsController.show").middleware("auth");

Route.post("comment", "CommentsController.postComment").middleware("auth");

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route.group(() => {
  // Route.get("tickets", "TicketsController.index");
  Route.get("tickets", "TicketsController.index");
  Route.post("close/ticket/:ticket_id", "TicketsController.close");
})
  .prefix("admin")
  .middleware(["auth", "admin"]);

//Route.get("admin/tickets", "TicketsController.index");
