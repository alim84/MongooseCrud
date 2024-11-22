const express = require("express");
const mongoose = require("mongoose");
const crudModel = require("./models/crudModel");
const app = express();

app.use(express.json());
const port = 4000;


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/crud");
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error.massage);
    process.exit(1);
  }
};


app.post("/creatdata", async(req, res) => {
  let {name} =req.body
  let crudModel= new crudModel({
    name
  })
 try{
  await crudModel.save()
  res.status(201).send({message:"Data Inserted"})
 }catch(error){
res.status(500).send({message:"Data not Inserted", error})
 }
})


app.get("/alldata", async (req, res) => {
 let alldata= await crudModel.find({

  })
  res.status(200).send({message:"Get all Data", alldata});
});
app.get("/:id", async  (req, res) => {
  let {id}=req.params;
 let singledata= await crudModel.findOne({_id:id

  })
  res.status(200).send({message:"Get Single Data", singledata});
});
app.delete("/deletedata/:id", async(req, res) => {
  let (id)=req.params;
  let deletedata = await crudModel.findOneAndDelete({_id:id})
  res.status(200).send({message: "Deleted Data", deletedata});
});
app.patch("/updatedata/:id", async (req, res) => {
  let (id)=req.params;
  let updatedata= await crudModel.findOneAndUpdate({_id:id},{name:name},{new:true})
  res.status(200).send({message: "Get all Data", updatedata });
});

app.listen(port, async (req, res) => {
  console.log(`Server is running http://localhost:${port}`);
  await connectDB();
});
