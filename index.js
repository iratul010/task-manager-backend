const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json())
app.get('/',(req,res)=>{
  res.send('Route is work')
})
app.listen(port,(req,res)=>{
  console.log('app is listening',port)
})