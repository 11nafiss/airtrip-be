const { RecordNotFoundError } = require("../../../errors");
const notificationService = require("../../../services/notificationService");

async function handleGetNotifications(req, res, next) {
  try {
    const notifications = await notificationService.getNotifications(
      req.user.id
    );

    res.status(200).json({ data: notifications });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function handleMarkRead(req, res, next) {
  try {
    const notification = await notificationService.markReadNotification(
      req.params.id
    );
    if (notification instanceof RecordNotFoundError) {
      return res.status(404).json({ message: notification.message });
    }
    res.status(200).json({ message: "Notification marked as read!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  handleGetNotifications,
  handleMarkRead,
};
