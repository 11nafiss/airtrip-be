const notificationRepository = require("../repositories/notificationRepository");
const { RecordNotFoundError } = require("../errors");
async function getNotifications(userId) {
  try {
    return await notificationRepository.getNotificationList(userId);
  } catch (error) {
    throw new Error(error);
  }
}

async function markReadNotification(notificationId) {
  try {
    const updatedNotification =
      await notificationRepository.markReadNotification(notificationId);
    if (updatedNotification) {
      return updatedNotification;
    }
    return new RecordNotFoundError(`Notification id ${notificationId}`);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getNotifications,
  markReadNotification,
};
