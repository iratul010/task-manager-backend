const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json())






const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://iratul010:dJ7b4OJDTRFVtCU1@cluster0.rofgw0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    await client.connect();
    //tasks
    const productDB = client.db("tasksManagerDB");
    const foodsCollection = productDB.collection("tasksCollection");
 
  } catch(err){}
}
run().catch(console.dir);


app.get('/',(req,res)=>{
  res.send('Route is work')
})
app.listen(port,(req,res)=>{
  console.log('app is listening',port)
})

// dJ7b4OJDTRFVtCU1