'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { getCollection } = require('./exercises/exercise-1-2');
const { 
  createGreeting, 
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
} = require('./exercises/exercise-2');

const PORT = process.env.PORT || 8000;

// const handleHi = (req, res) => {

//   res.status(200).json({ status: 200, connection: 'successful!' })
//   // res.status(200).send;
//   // res.send('hi');

// }

express()
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // .get('/hi', handleHi)

  // exercise 1
  .get('/ex-1/:dbName/:collection', getCollection)
  // exercise 2
  .post('/ex-2/greeting', createGreeting)
  .get('/ex-2/getGreeting/:_id', getGreeting)
  .get('/ex-2/getGreetings', getGreetings)
  .delete('/ex-2/deleteGreeting/:_id', deleteGreeting)
  .put('/ex-2/updateGreeting/:_id', updateGreeting)

  // handle 404s
  .use((req, res) => res.status(404).type('txt').send('🤷‍♂️'))

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
