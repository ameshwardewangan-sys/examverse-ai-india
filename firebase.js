/* ==========================================================
   EXAMVERSE AI v3.0
   firebase.js
========================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* ==========================================================
   FIREBASE CONFIG
========================================================== */

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.appspot.com",

    messagingSenderId: "YOUR_SENDER_ID",

    appId: "YOUR_APP_ID"

};

/* ==========================================================
   INITIALIZE FIREBASE
========================================================== */

const app = initializeApp(firebaseConfig);

/* ==========================================================
   SERVICES
========================================================== */

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

/* ==========================================================
   EXPORT
========================================================== */

export {

    app,

    auth,

    db,

    storage

};

/* ==========================================================
   FIREBASE PART 2
   AUTH + DATABASE + STORAGE HELPERS
========================================================== */

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ==========================================================
   GOOGLE LOGIN
========================================================== */

const googleProvider = new GoogleAuthProvider();

export async function googleLogin() {

  const result = await signInWithPopup(auth, googleProvider);

  return result.user;

}

/* ==========================================================
   LOGOUT
========================================================== */

export async function logout() {

  await signOut(auth);

}

/* ==========================================================
   SAVE USER
========================================================== */

export async function saveUser(user) {

  const ref = doc(db, "users", user.uid);

  await setDoc(ref, {

    uid: user.uid,

    name: user.displayName || "User",

    email: user.email,

    photo: user.photoURL || "",

    createdAt: serverTimestamp()

  }, { merge: true });

}

/* ==========================================================
   GET USER
========================================================== */

export async function getUser(uid) {

  const snap = await getDoc(doc(db, "users", uid));

  if (snap.exists()) {

    return snap.data();

  }

  return null;

}

/* ==========================================================
   UPDATE USER
========================================================== */

export async function updateUser(uid, data) {

  await updateDoc(doc(db, "users", uid), data);

}
