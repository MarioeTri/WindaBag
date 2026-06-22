const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../windabag-3f146-firebase-adminsdk-fbsvc-8849085f20.json");

admin.initializeApp({
  credential: admin.cert(serviceAccount),
});

const db = getFirestore();

module.exports = { admin, db };
