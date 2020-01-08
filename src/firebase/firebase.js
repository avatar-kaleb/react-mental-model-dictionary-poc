import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  // removed for security
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

// firebase.database.enableLogging(true);
const db = firebase.database();
const storage = firebase.storage();
export { auth, db, firebase, storage };
