const { MongoClient } = require('mongodb');

const assert = require('assert');

const createGreeting = async (req, res) => {
  console.log(req.body);
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db('exercise_test');

    const r = await db.collection('greetings').insertOne(req.body);
    assert.equal(1, r.insertedCount);
    res.status(201).json({ status: 201, data: req.body });

  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
};


const getGreeting = async (req, res) => {
  // console.log('PARAMSPARAMSPARAMSPARAMS', req.params);
  const _id = req.params._id;
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  // console.log('_id_id_id_id_id',_id);
  try {
    await client.connect();
    const db = client.db('exercise_test');
    // console.log('dbdbdbdbdbdbdb',db);
    // await db.collection('greetings').find().toArray((err, result)=>{
    //   console.log('result', result, 'error', err);

    // });
    // const r = await db.collection('greetings').insertOne(req.body);  from previous function
    await db.collection('greetings').findOne({ _id: _id.toUpperCase() }, (err, result) => {
    // db.collection('two').findOne({ _id }, (err, result) => {
      // console.log('resultresultresultresult',result);
      result ? 
        (res.status(200).json({ status: 200, _id, data: result })) 
        : (res.status(404).json({ status: 404, _id, data: 'Not Found', err: err }));
      client.close();
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json('Something went wrong.');
    client.close();
  }
};

const getGreetings = async (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db('exercise_test');
  db.collection('greetings').find().toArray((err, result)=>{
    if (result.length > 0) {
      const start = parseInt(req.query.start) - 1 || 0;
      const limit = parseInt(req.query.limit) || 25;
      let finish = start + limit;
      if (start+limit > result.length) {
        finish = result.length-1
      }
      const response = result.slice(start, finish);
      res.status(200).json({ status: 200, data: response });
      // client.close();
    }
    else if (result.length === 0) {
      console.log('result', result, 'error', err);
      res.status(404).json({ status: 404, data: "Nothing found" });
      // client.close();
    }
    else {
      res.status(404).json({ status: 404, data: 'Not Found?' });
      // client.close();
    } 
    client.close();
  });
}

const deleteGreeting = async (req, res) => {
  const _id = req.params._id;
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  
  try{
    await client.connect();
    const db = client.db('exercise_test');
    const r = await db.collection('greetings').deleteOne({_id});
    assert.equal(1, r.deletedCount);
    console.log('dnsiuhdbsjksbcuoiljhsnkbchidsojm');
    res.status(200).json({ status: 204, _id, message: `deleted id: ${_id}` });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};


const updateGreeting = async (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  const query = { _id: req.params._id };
  console.log('_id_id_id_id_id', query);
  let test = req.body;
  let testKeys = Object.keys(test);
  console.log('testKeystestKeystestKeystestKeys',testKeys)
  const found = testKeys.find(key => key === 'hello');
  console.log('foundfoundfoundfoundfoundfound',found)
  if (!found || test.hello.length === 0) {
    res.status(400).json({ status: 400, bacon: 'invalid body: hello not found' });
  }
  const newValues = { $set: { hello : test.hello } };
  try{
  await client.connect();
  const db = client.db('exercise_test');
  console.log('111111111111')
  const r = await db.collection('greetings').updateOne(query, newValues);
  console.log('22222222222')
  assert.equal(1, r.matchedCount);
  assert.equal(1, r.modifiedCount);
  console.log('33333333333')
  res.status(200).json({ status: 200, bacon: 'bacon!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, bacon: 'bacon not found' });
  }
  client.close();
}

module.exports = { 
  createGreeting, 
  getGreeting, 
  getGreetings, 
  deleteGreeting, 
  updateGreeting 
}