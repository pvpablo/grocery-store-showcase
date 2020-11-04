const admin = require('firebase-admin')
const { Storage } = require('@google-cloud/storage')
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.DATABASE_URL,
})

const collections = {
  "categories": require("./data/categories.json"),
  "deals": require("./data/deals.json"),
  "products": require("./data/products.json"),
  "stats": require("./data/stats.json"),
  "stores": require("./data/stores.json")
}

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

for (const [collection, fixture] of Object.entries(collections)) {
  if (fixture && typeof fixture === "object") {
    Object.keys(fixture).forEach((docKey) => {
      firestore
        .collection(collection)
        .doc()
        .set(fixture[docKey])
        .then(() => {
          console.log("Document " + docKey + " successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        })
    })
  }

}

const bucket = {
  "categories": ['category_1.jpg', 'category_2.jpg', 'category_3.jpg', 'category_4.jpg', 'category_5.jpg', 'category_6.jpg', 'category_7.jpg',        'category_8.jpg'],
  "deals": ['deals_1.jpg', 'deals_2.jpg', 'deals_3.jpg', 'deals_4.jpg'] ,
  "products": ['product_1.jpg', 'product_2.jpg', 'product_3.jpg', 'product_4.jpg', 'product_5.jpg', 'product_6.jpg'],
  "stores": ['a.jpg', 'b.jpg'] 
}

const storage = new Storage()
const BASE_BUCKET = `gs://${process.env.PROJECT_ID}.appspot.com`
const BASE_MEDIA = './media'
console.log(BASE_BUCKET)
for (const [folderName, contents] of Object.entries(bucket)) {
  let bucketName = `${BASE_BUCKET}`
  let basePath = `${folderName}`
  let mediaFolder = `${BASE_MEDIA}/${folderName}`
  contents.forEach( file => {
    let fullPath = `${basePath}/${file}`
    let fileName = `${mediaFolder}/${file}`
    console.log(fileName)
    uploadFile(bucketName, fileName, fullPath).catch(console.error);
  })
}

async function uploadFile(bucketName, filename, fullPath) {
  // Uploads a local file to the bucket
  await storage.bucket(bucketName).upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the object you are uploading to a bucket.
    destination: fullPath,
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  })
  console.log(`${filename} uploaded to ${bucketName}.`);
}



