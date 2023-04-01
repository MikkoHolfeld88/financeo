import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {respond} from "./bot_interaction/greeting";

admin.initializeApp();

exports.categorizeTransactions = functions.https.onRequest((request, response) => {
  response.json({test: "test"});
});

exports.respondToIntent = functions.https.onRequest((request, response) => {
  const answer: string = respond(request);
  response.json({answer: answer});
});
