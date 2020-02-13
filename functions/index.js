const admin = require("firebase-admin");
const functions = require("firebase-functions");
const createUser = require("./create_user");

const serviceAccount = require("./service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://one-time-password-c373e.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
