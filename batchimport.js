const fileSystem = require('file-system');

const { MongoClient } = require('mongodb');

const assert = require('assert');
const greetings = JSON.parse(fileSystem.readFileSync('data/greetings.json'));

const client = new MongoClient('mongodb://localhost:27017', {
  useUnifiedTopology: true,
});

const batchImport = async () => {
  try {
    await client.connect();
    console.log('connected');
    const db = client.db('exercise_test');
    const r = await db.collection('greetings').insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
  
  }
  // console.log(greetings);
  catch (err) {
    console.log(err);
  }

client.close();

};

batchImport();