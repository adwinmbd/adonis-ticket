"use strict";

const Mail = use("Mail");
const { validateAll } = use("Validator");
const Comment = use("App/Models/Comment");

class CommentsController {
  /**
   * Persist comment and mail user
   */
  async postComment({ auth, response, request, session }) {
    const userData = request.only(["comment"]);
    const user = auth.user;
    const rules = {
      comment: "required"
    };

    // validate form input
    const validation = await validateAll(userData, rules);

    // show error messages upon validation fail
    if (validation.fails()) {
      session.withErrors(validation.messages());
      return response.redirect("back");
    }

    // persist comment to database
    const comment = await Comment.create({
      ticket_id: request.input("ticket_id"),
      user_id: user.id,
      comment: request.input("comment")
    });

    const commentTicket = await comment.ticket().fetch();
    const commentUser = await commentTicket.user().fetch();

    // send mail if the user commenting is not the ticket owner
    if (commentUser.id != user.id) {
      await Mail.send(
        "emails.ticket_comments",
        { commentUser, user, commentTicket, comment },
        message => {
          message.to(commentUser.email, commentUser.username);
          message.from("support@adotiksm.dev");
          message.subject(
            `RE: ${commentTicket.title} (Ticket ID: ${commentTicket.ticket_id})`
          );
        }
      );
    }

    session.flash({
      notification: {
        type: "success",
        message: "Your comment has been submitted."
      }
    });
    response.redirect("back");
  }
}

module.exports = CommentsController;
