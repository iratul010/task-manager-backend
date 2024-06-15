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
    //user
    const userDB = client.db("userDB");
    const userCollection =userDB.collection("userCollection");
    //tasks
    const tasksDB = client.db("taskManagerDB");
    const tasksCollection = tasksDB.collection("tasksCollection");
 



  //user
  app.post("/user", async (req, res) => {
    const user = req.body;
     const existEmail = await userCollection.findOne({email:user?.email});
     if(!existEmail){

       const result = await userCollection.insertOne(user);
       res.send(result);
     }
     else{
      res.send( {
        status:'success',
        message:'Login success'
      })
     }
  });   
  app.get("/user/:email", async (req, res) => {
    const email = req.params.email;
     const user = await userCollection.findOne({email})//email===email:email (same)
       res.send(user);
 
  });   
  app.patch("/user/:email", async (req, res) => {
    const email = req.params.email;
    const userData = req.body;
     const result = await userCollection.updateOne({email},{$set:userData},{upsert:true})//email===email:email (same)
       res.send(result);
 
  });   
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