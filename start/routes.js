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
// Route.on("/home").render("home").as("home");
//Route.get('/home', 'HomeController.index').as('home')

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
Route.get("new_ticket", "TicketsController.create");
Route.post("new_ticket", "TicketsController.store");
Route.get("tickets/:ticket_id", "TicketsController.show");
Route.get("my_tickets", "TicketsController.userTickets");

Route.post("comment", "CommentsController.postComment");

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route.group(() => {
  Route.get("tickets", "TicketsController.index");
  Route.post("close_ticket/:ticket_id", "TicketsController.close");
})
  .prefix("admin")
  .middleware(["auth", "admin"]);

Route.get("tickets", "TicketsController.index");
