const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const firestore = admin.firestore();

exports.updateNotifications = functions.pubsub.schedule('every 1 minutes').onRun(async context => {
  try {
    const notificationsCollection = firestore.collection('notifications');

    const notificationsSnapshots = await notificationsCollection.get();

    const updatePromises = [];

    notificationsSnapshots.forEach(doc => {
      const allNotifications = doc.data().allNotifications || [];
      allNotifications.push({
        readed: false,
        text: "Have you checked out today's promos",
        time: new Date(),
      });

      const updatePromise = doc.ref.update({ allNotifications });
      updatePromises.push(updatePromise);
    });

    await Promise.all(updatePromises);

    return null;
  } catch (error) {
    console.error('Error updating notifications:', error);
    return null;
  }
});
