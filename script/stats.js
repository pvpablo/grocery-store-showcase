var admin = require('firebase-admin');
const data = require("./data/stats.json");
const moment = require("moment")
const collectionKey = "stats"; //name of the collection
//export GOOGLE_APPLICATION_CREDENTIALS="/Users/pablopv/Downloads/grocery-store-dev-7e803-firebase-adminsdk-drxvx-6974c5b25c.json"
//export GOOGLE_APPLICATION_CREDENTIALS="/Users/lu/Documents/www/grocery-store-showcase/script/grocery-store-dev-7e803-firebase-adminsdk-drxvx-d83f118b7f.json"
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://grocery-store-dev-7e803.firebaseio.com",
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
const today = moment();
let past = moment();
past = past.subtract(30, "days");

console.log("NEW START DATE", past);
if (data && typeof data === "object") {
  for (let m = moment(past), index = 0; m.isBefore(today); m.add(1, 'days'), index++) {
    console.log(m.format('YYYY-MM-DD'));
    console.log(data[index], index);
    let stat_info = Object.assign({}, data[index]);
    stat_info.date = new Date(m.format('YYYY-MM-DD'));
    stat_info.amount =  +stat_info.amount;
    firestore
      .collection(collectionKey)
      .add(stat_info)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      })
  }
}
