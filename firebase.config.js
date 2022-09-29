import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCSl1_8J03A-a594iZoWaOjYWjDeESrsAE",
  authDomain: "youreview-e6f5b.firebaseapp.com",
  projectId: "youreview-e6f5b",
  storageBucket: "youreview-e6f5b.appspot.com",
  messagingSenderId: "533512563552",
  appId: "1:533512563552:web:496a052a8c9290e0c20c05",
};

// Initialize  Firebase
initializeApp(firebaseConfig);

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}
