import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

exports.test = functions.https.onRequest((request, response) => {
  response.json({test: "test"});
});

exports.categorizeTransactions = functions.https.onRequest((request, response) => {
  response.json({test: "test"});
});
