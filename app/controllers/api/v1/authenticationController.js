const { use } = require("../../../../config/routes");
const { EmailAlreadyRegisteredError } = require("../../../errors");
const authenticationService = require("../../../services/AuthenticationService");

async function register(req, res) {
  try {
    /* req.body = {email, password}
     */
    const user = await authenticationService.register(req.body);
    console.log(user);
    if (user instanceof EmailAlreadyRegisteredError) {
      return res.status(422).json(user.message);
    }
    res.status(201).json(user);
  } catch (error) {}
}

module.exports = { register };
