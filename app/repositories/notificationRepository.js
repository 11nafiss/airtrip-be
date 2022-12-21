const { Notification } = require("../models");

async function getNotificationList(userId) {
  try {
    return await Notification.findAll({ where: { user_id: userId } });
  } catch (error) {
    throw new Error(error);
  }
}

async function getNotificationById(notificationId) {
  try {
    return await Notification.findByPk(notificationId);
  } catch (error) {
    throw new Error(error);
  }
}

async function createNotification(userId, ticketId, message) {
  try {
    return await Notification.create(
      {
        user_id: userId,
        ticket_id: ticketId,
        message,
        has_read: false,
      },
      { returning: true }
    );
  } catch (error) {
    throw new Error(error);
  }
}

async function markReadNotification(notificationId) {
  try {
    const notification = await Notification.update(
      { has_read: true },
      { where: { id: notificationId }, fields: ["has_read"], returning: true }
    );
    return notification[1][0];
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  getNotificationList,
  createNotification,
  markReadNotification,
  getNotificationById,
};
