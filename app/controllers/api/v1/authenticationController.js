const { use } = require("../../../../config/routes");
const {
  EmailAlreadyRegisteredError,
  EmailNotRegisteredError,
  WrongPasswordError,
  UnauthorizedError,
} = require("../../../errors");
const authenticationService = require("../../../services/AuthenticationService");

async function register(req, res, next) {
  try {
    /* req.body = {email, password, phone, name, address}
     */
    const registeredEmail = await authenticationService.register(req.body);

    if (registeredEmail instanceof EmailAlreadyRegisteredError) {
      return res.status(422).json({ message: registeredEmail.message });
    }
    res.status(201).json({ email: registeredEmail });
  } catch (error) {
    req.error = error;
    next();
  }
}

async function login(req, res, next) {
  // req.body = {email, password}
  try {
    const token = await authenticationService.login(req.body);

    if (token instanceof EmailNotRegisteredError) {
      return res.status(404).json({ message: token.message });
    }

    if (token instanceof WrongPasswordError) {
      return res.status(401).json({ message: token.message });
    }

    res.status(200).json({ accessToken: token });
  } catch (error) {
    req.error = error;
    next();
  }
}

async function authorize(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await authenticationService.authorize(token);

    if (user instanceof UnauthorizedError) {
      return res.status(401).json({ message: user.message, cause: user.cause });
    }
    req.user = user;
    next();
  } catch (error) {
    req.error = error;
    next();
  }
}
module.exports = { register, login, authorize };
