"use strict";
const User = use("App/Models/User");
const { validateAll } = use("Validator");

class AuthController {
  /**
   * Show login page
   */
  showLoginPage({ view }) {
    return view.render("auth.login");
  }

  /**
   * Handle user authentication
   */
  async login({ request, auth, response, session }) {
    const userData = request.only(["email", "password"]);
    const rules = {
      email: "required|email",
      password: "required"
    };
    // validate form input
    const validation = await validateAll(userData, rules);

    // show error messages upon validation fail
    if (validation.fails()) {
      /*await request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash();*/
      session.withErrors(validation.messages()).flashExcept(["password"]);
      return response.redirect("back");
    }

    // const email = request.input("email");
    // const password = request.input("password");
    //const { email, password, remember } = request.all();
    const { email, password } = request.all();

    try {
      //await auth.remember(!!remember).attempt(email, password)
      await auth.attempt(email, password);

      // redirect to homepage
      return response.route("home");
    } catch (e) {
      // await request.with({ error: "Invalid credentails" }).flash();
      session.flash({
        notification: {
          type: "danger",
          message: `We couldn't verify your credentials.`
        }
      });
      // redirect back with error
      response.redirect("back");
    }
  }

  /**
   * Show register page
   */
  async showRegisterPage({ view }) {
    return view.render("auth.register");
  }

  /**
   * Handle user registration
   */
  async register({ auth, request, response, session }) {
    const userData = request.only(["username", "email", "password"]);
    const rules = {
      username: "required|unique:users",
      email: "required|email|unique:users",
      password: "required|min:6"
    };

    // validate form input
    const validation = await validateAll(userData, rules);

    // show error messages upon validation fail
    if (validation.fails()) {
      console.log(userData);
      const error = validation.messages();
      // return error;
      session.withErrors(validation.messages()).flashExcept(["password"]);
      return response.redirect("back");
    }

    // persist to database
    const user = await User.create(userData);

    // login the user
    await auth.login(user);
    // redirect to homepage
    return response.route("home");
  }

  /**
   * Logout authenticated user
   */
  async logout({ auth, response }) {
    await auth.logout();
    return response.route("/login");
  }
}

module.exports = AuthController;
