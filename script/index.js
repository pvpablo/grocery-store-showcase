var admin = require('firebase-admin');
const data = require("./data/products.json");
const collectionKey = "products"; //name of the collection
//export GOOGLE_APPLICATION_CREDENTIALS="/Users/pablopv/Downloads/grocery-store-dev-7e803-firebase-adminsdk-drxvx-6974c5b25c.json"

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://grocery-store-dev-7e803.firebaseio.com",
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
if (data && typeof data === "object") {
  Object.keys(data).forEach((docKey) => {
    firestore
      .collection(collectionKey)
      .doc()
      .set(data[docKey])
      .then(() => {
        console.log("Document " + docKey + " successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      })
  })
}
