const notificationRepository = require("../repositories/notificationRepository");
const { RecordNotFoundError } = require("../errors");
async function getNotifications(userId) {
  return await notificationRepository.getNotificationList(userId);
}

async function markReadNotification(notificationId) {
  const updatedNotification = await notificationRepository.markReadNotification(
    notificationId
  );
  if (updatedNotification) {
    return updatedNotification;
  }
  return new RecordNotFoundError(`Notification id ${notificationId}`);
}

module.exports = {
  getNotifications,
  markReadNotification,
};
