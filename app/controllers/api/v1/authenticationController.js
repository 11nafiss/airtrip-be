const { use } = require("../../../../config/routes");
const {
  EmailAlreadyRegisteredError,
  EmailNotRegisteredError,
  WrongPasswordError,
} = require("../../../errors");
const authenticationService = require("../../../services/AuthenticationService");

async function register(req, res, next) {
  try {
    /* req.body = {email, password}
     */
    const registeredEmail = await authenticationService.register(req.body);

    if (registeredEmail instanceof EmailAlreadyRegisteredError) {
      return res.status(422).json(registeredEmail.message);
    }
    res.status(201).json({ email: registeredEmail });
  } catch (error) {
    req.error = error;
    next();
  }
}

async function login(req, res, next) {
  try {
    const token = await authenticationService.login(req.body);

    if (token instanceof EmailNotRegisteredError) {
      return res.status(404).json(token.message);
    }

    if (token instanceof WrongPasswordError) {
      return res.status(401).json(token.message);
    }

    res.status(200).json({ accessToken: token });
  } catch (error) {}
}
module.exports = { register, login };
