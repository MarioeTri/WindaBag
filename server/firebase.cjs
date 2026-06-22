const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const path = require("path");

const serviceAccount = path.join(
  __dirname,
  "..",
  "windabag-3f146-firebase-adminsdk-fbsvc-ca67488008.json"
);

admin.initializeApp({
  credential: admin.cert(serviceAccount),
});

const db = getFirestore();

module.exports = { admin, db };
