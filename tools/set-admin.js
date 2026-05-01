/**
 * set-admin.js
 *
 * Run this once to give your Firebase account admin privileges.
 * This lets you create and delete polls in the app.
 *
 * Usage:
 *   node tools/set-admin.js YOUR_USER_UID
 *
 * Find your UID in Firebase Console → Authentication → Users
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const uid = process.argv[2];

if (!uid) {
  console.error('Error: No UID provided.');
  console.error('Usage: node tools/set-admin.js YOUR_USER_UID');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`Success! User ${uid} is now an admin.`);
    console.log('They will need to sign out and sign back in for the change to take effect.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to set admin claim:', error.message);
    process.exit(1);
  });
