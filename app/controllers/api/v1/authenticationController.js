const authenticationService = require("../../../services/AuthenticationService");

async function register(req, res) {
  try {
    /* req.body = {email, password}
     */
    const user = await authenticationService.register(req.body);
    res.status(201).json(user);
  } catch (error) {}
}

module.exports = { register };
