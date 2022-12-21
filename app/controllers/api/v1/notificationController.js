const notificationService = require("../../../services/notificationService");

async function handleGetNotifications(req, res, next) {
  try {
    const notifications = await notificationService.getNotifications(
      req.user.id
    );

    res.status(200).json({ data: notifications });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleGetNotifications,
};
