// db.js
import { MongoClient } from 'mongodb';

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { type } from 'os';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Absolute path to the JSON file
const filePath = join(__dirname, 'kurtiF.json');
const fileData = await readFile(filePath, 'utf-8');
const data = JSON.parse(fileData);



const uri = 'mongodb+srv://aayushlingwal:Aayu200$@cluster0.00yyt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'Project';
const collectionName = 'product';

async function writeAllData() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const preparedData = data.map((item, index) => {
      let price = item.currentPrice;
      if(typeof price === 'string') price = parseFloat(price.replace(/,/g, ''));
      let oldPrice = item.oldPrice
      if(typeof oldPrice=== 'string') oldPrice = parseFloat(oldPrice.replace(/,/g, '')); // fallback to price if oldPrice missing


      return {
        _id:index,
        title: item.title,
        description: item.description,
        color: item.color,
        quantity: Array.from({ length: 6 }, (_, i) => i),
        src: item.src,
        brand: "Custom Brand",
        imageUrl: item.src,
        price: oldPrice,
        discountedPrice: price,
        discountPer:((oldPrice - price)*100) / oldPrice,
        topLevelCategory: "Kurti",
        secondLevelCategory: "Kurti",
        thirdLevelCategory: "Kurti",
        ratings:[0,0,0,0,0]
      };
    });

    const result = await collection.insertMany(preparedData);
    console.log(`✅ Successfully inserted ${result.insertedCount} documents`);
  } catch (err) {
    console.error('❌ Error writing to MongoDB:', err);
  } finally {
    await client.close();
  }
}

writeAllData();