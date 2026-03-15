const admin = require('firebase-admin');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

let db;
let auth;

const initializeFirebase = () => {
  try {
    if (!admin.apps.length) {
      let serviceAccount;
      
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      } else {
        const sdkPath = path.resolve(__dirname, '../../firebase-admin-sdk.json');
        serviceAccount = require(sdkPath);
      }

      if (serviceAccount.private_key) {
        serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
      });
      console.log('Firebase Admin initialized successfully');
    }
    
    db = admin.firestore();
    auth = admin.auth();
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error.stack);
    process.exit(1); // Exit if critical config fails
  }
};

module.exports = { 
  admin, 
  get db() { return db || (admin.apps.length ? admin.firestore() : null) },
  get auth() { return auth || (admin.apps.length ? admin.auth() : null) },
  initializeFirebase 
};
