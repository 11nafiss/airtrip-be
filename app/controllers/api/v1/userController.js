const {
  UnauthorizedError,
  EmailAlreadyRegisteredError,
} = require("../../../errors");
const userService = require("../../../services/userService");

async function handleUpdateUser(req, res, next) {
  // req.body = {email, password, image, phone, name, address}
  try {
    const id = req.params.id;

    const updatedUser = await userService.updateUser(id, req.body, req.user);

    if (updatedUser instanceof UnauthorizedError) {
      res
        .status(401)
        .json({ message: updatedUser.message, cause: updatedUser.cause });
      return;
    }

    if (updatedUser instanceof EmailAlreadyRegisteredError) {
      return res.status(422).json({ message: updatedUser.message });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function handleWhoami(req, res, next) {
  try {
    res.status(200).json({ data: req.user });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  handleUpdateUser,
  handleWhoami,
};
