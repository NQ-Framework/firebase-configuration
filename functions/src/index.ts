import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const createProfile = (userRecord: admin.auth.UserRecord) => {
  const { email, phoneNumber, uid, displayName, photoURL } = userRecord;

  return admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set({
      email,
      displayName,
      photoURL,
      phoneNumber,
      deleteDate: null,
      organization: null,
    })
    .catch(console.error);
};

const deleteProfile = (userRecord: admin.auth.UserRecord) => {
  return admin
    .firestore()
    .collection("users")
    .doc(userRecord.uid)
    .set({ deleteDate: new Date() }, { merge: true })
    .catch(console.error);
};

exports.createUser = functions.auth.user().onCreate(createProfile);
exports.deleteUser = functions.auth.user().onDelete(deleteProfile);
