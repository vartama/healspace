const admin = require('firebase-admin');

const serviceAccount = require('../heal-space-firebase-adminsdk-ldry2-74d38940c2.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://heal-space-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

module.exports = admin;