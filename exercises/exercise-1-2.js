const { MongoClient } = require('mongodb');

const getCollection = async (req, res) => {
  const dbName = req.params.dbName;
  const collection = req.params.collection;
  // console.log(dbName, collection)
  const client = new MongoClient('mongodb://localhost:27017', {
    useUnifiedTopology: true,
  });
  
  await client.connect();
  console.log('connected!')
  const db = client.db(dbName);
  db.collection(collection)
    .find()
    .toArray((err, data) => {
      if (err) {
        res.status(400)
      } 
      else {
        res.status(201).send(data)
        client.close();
        console.log('disconnected!');
      }
    })
};
module.exports = { getCollection }







// const { MongoClient } = require('mongodb');

// const doTwoThings = () => {
//   return (req, res) => {
//     console.log('grats barh you did tewo things');
//     res.status(200).json({ status: 200, connection: 'successful!' });
//     client.close();
//   }
// }

// const getCollection = async (req, res) => {
//   const dbName = req.params.dbName;
//   const collection = req.params.collection;

//   console.log('dbNamedbNamedbNamedbNamedbName',dbName);
//   console.log('collectioncollectioncollectioncollectioncollection',collection);

//   // create a new client
//   const client = new MongoClient('mongodb://localhost:27017', {
//     useUnifiedTopology: true,
//   });
//   // open the connection to the database server
//   await client.connect();
//   console.log('connected!');

//   const db = client.db(dbName);
//   // db.collection(collection)
//   //         .find()
//   //         .toArray((err, data) => {
//   //           console.log('datadatadatadatadatadata',data)
//   //             if (err) {
//   //                 res.status(400)
//   //             }
//   //             else {
//   //                 res.status(201).send(data)
//   //                 client.close();
//   //                 console.log('disconnected!');
//   //             }
//   //         })

//   db.collection(collection)
//   // console.log('collectioncollectioncollection', collection)
//     .find()
//     .toArray((err, result) => {
//       console.log('errrrrrrrrrrrrrr', err)
//       console.log('---------------------------',result)

//       // if (err) {
//       //   console.log(result)
//       //   console.log('neufjekmsfckjbnjerwfknlkwhbfuhiljekwnbf hw',result.length)
//       //   res.status(404).json({ status: 404, connection: 'failyoudumbfuck!' })
//       // }
//       // else {

//       //   console.log('neufjekmsfckjbnjerwfknlkwhbfuhiljekwnbf hw',result.length)
//       //   res.status(200).json({ status: 200, connection: 'successful!' })
//       //   client.close();
//       // }
      
//       if (result.status === 200) {
//         res.status(200).json({ status: 200, connection: 'successful!' })
//       }
//       else {
//         res.status(404).json({ status: 404, data: 'Not Found' });
//       }
//       result.length
//       ? doTwoThings(req, res)
//         // ? res.status(200).json({ status: 200, connection: 'successful!' }) 
//         : res.status(404).json({ status: 404, data: 'Not Found' });
//     });

//   // close the connection to the database server
//   // client.close();
//   console.log('disconnected!');
// };

// module.exports = { getCollection };