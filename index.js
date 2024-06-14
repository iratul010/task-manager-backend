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
    const tasksDB = client.db("taskManagerDB");
    const tasksCollection = tasksDB.collection("tasksCollection");
 

 //post method for used insertOne method here
 app.post("/task", async (req, res) => {
  const taskData = req.body;
  
  const result = await tasksCollection.insertOne(taskData);
  res.send(result);
});
app.get("/tasks", async (req, res) => {
  const taskData = tasksCollection.find();
  const result = await taskData.toArray();
  res.send(result);
});

  } catch(err){
    console.log(err)
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
  res.send('Route is work')
})
app.listen(port,(req,res)=>{
  console.log('app is listening',port)
})

// dJ7b4OJDTRFVtCU1