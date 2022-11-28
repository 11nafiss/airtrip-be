const { use } = require("../../../../config/routes");
const { EmailAlreadyRegisteredError } = require("../../../errors");
const authenticationService = require("../../../services/AuthenticationService");

async function register(req, res, next) {
  try {
    /* req.body = {email, password}
     */
    console.log(req.body);
    const user = await authenticationService.register(req.body);

    if (user instanceof EmailAlreadyRegisteredError) {
      return res.status(422).json(user.message);
    }
    res.status(201).json(user);
  } catch (error) {
    req.error = error;
    next();
  }
}

module.exports = { register };
