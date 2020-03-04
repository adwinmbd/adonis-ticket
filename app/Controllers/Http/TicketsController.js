"use strict";
const Mail = use("Mail");
const { validateAll } = use("Validator");
const Ticket = use("App/Models/Ticket");
const Category = use("App/Models/Category");
const User = use("App/Models/User");
// const crypto = require('crypto')
// newToken.token = await crypto.randomBytes(10).toString("hex");

class TicketController {
  /**
   * Display all tickets.
   */
  async index({ view }) {
    const tickets = await Ticket.all();
    const categories = await Category.all();

    // return tickets
    return view.render("tickets.index", {
      tickets: tickets.toJSON(),
      categories: categories.toJSON()
    });
  }

  /**
   * Display all tickets by a user.
   */
  async userTickets({ auth, view }) {
    const user = auth.user;
    const tickets = await Ticket.query()
      .where("user_id", user.id)
      .fetch();
    const categories = await Category.all();

    return view.render("tickets.user_tickets", {
      tickets: tickets.toJSON(),
      categories: categories.toJSON()
    });
  }

  /**
   * Show the form for opening a new ticket.
   */
  async create({ view }) {
    const categories = await Category.pair("id", "name");

    return view.render("tickets.create", { categories });
  }

  /**
   * Store a newly created ticket in database.
   */
  async store({ auth, request, response, params, session }) {
    // const user = auth.user;
    // console.log(user);
    const user = auth.user;
    const rules = {
      title: "required",
      category: "required",
      priority: "required",
      message: "required"
    };

    const randomString = [...Array(12)]
      .map(i => (~~(Math.random() * 36)).toString(36).toUpperCase())
      .join("");

    const userData = request.all();
    const validation = await validateAll(userData, rules);

    // show error messages upon validation fail
    if (validation.fails()) {
      /*yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash();*/

      session.withErrors(validation.messages());

      return response.redirect("back");
    }
    // newToken.token = await crypto.randomBytes(10).toString("hex");

    // validate form input

    // persist ticket to database
    const ticket = await Ticket.create({
      title: request.input("title"),
      user_id: user.id,
      ticket_id: randomString,
      category_id: request.input("category"),
      priority: request.input("priority"),
      message: request.input("message"),
      status: "Open"
    });

    // send mail notification
    await Mail.send("emails.ticket_info", { user, ticket }, message => {
      message.to(user.email, user.username);
      message.from("support@adotiksm.dev");
      message.subject(`[Ticket ID: ${ticket.ticket_id}] ${ticket.title}`);
    });

    /*await request
      .with({
        status: `A ticket with ID: #${ticket.ticket_id} has been opened.`
      })
      .flash();*/
    session.flash({
      notification: {
        type: "success",
        message: `A ticket with ID: #${ticket.ticket_id} has been opened.`
      }
    });
    response.redirect("back");
  }

  /**
   * Display a specified ticket.
   */
  async show({ params, response, view }) {
    // console.log(params.ticket_id);
    const ticket = await Ticket.query()
      .where("ticket_id", params.ticket_id)
      .with("user")
      .firstOrFail();
    /*const param = params.ticket_id;
    console.log(String(param));*/
    /*const { ticket_id } = params;
    const ticket = await Ticket.query()
      .where("ticket_id", ticket_id)
      .with("user")
      .fetch();
    return ticket;*/
    const comments = await ticket
      .comments()
      .with("user")
      .fetch();
    const category = await ticket.category().fetch();

    return view.render("tickets.show", {
      ticket: ticket.toJSON(),
      comments: comments.toJSON(),
      category: category.toJSON()
    });
  }

  /**
   * Close the specified ticket.
   */
  /*async close({ params, response }) {
    const ticket = await Ticket.query()
      .where("ticket_id", params.ticket_id)
      .firstOrFail();
    ticket.status = "Closed";
    await ticket.save();

    const ticketOwner = await ticket.user().fetch();

    // send email
    await Mail.send(
      "emails.ticket_status",
      { ticketOwner, ticket },
      message => {
        message.to(ticketOwner.email, ticketOwner.username);
        message.from("support@adonissupport.dev");
        message.subject(`RE: ${ticket.title} (Ticket ID: ${ticket.ticket_id})`);
      }
    );

    // await request.with({ status: "The ticket has been closed." }).flash();
    session.flash({
      notification: {
        type: "success",
        message: "The ticket has been closed."
      }
    });
    response.redirect("back");
  }*/
}

module.exports = TicketController;
