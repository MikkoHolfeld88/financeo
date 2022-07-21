export const BASE_URL = "https://firestore.googleapis.com/v1/";

export const ACCOUNTS_API = BASE_URL + "/projects/" + process.env.REACT_APP_PROJECT_ID + "/databases/(default)/documents/accounts/";// + user.uid