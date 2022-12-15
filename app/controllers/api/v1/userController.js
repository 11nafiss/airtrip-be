const {
  UnauthorizedError,
  EmailAlreadyRegisteredError,
} = require("../../../errors");
const userService = require("../../../services/userService");

async function handleUpdateUser(req, res, next) {
  // req.body = {email, password, phone, name, address}
  try {
    const id = req.params.id;

    const updatedUser = await userService.updateUser(id, req.body, req.user);

    if (updatedUser instanceof UnauthorizedError) {
      res
        .status(401)
        .json({ message: updatedUser.message, cause: updatedUser.cause });
    }

    if (updatedUser instanceof EmailAlreadyRegisteredError) {
      return res.status(422).json({ message: updatedUser.message });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    req.error;
    next();
  }
}

module.exports = {
  handleUpdateUser,
};
