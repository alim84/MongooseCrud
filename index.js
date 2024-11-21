const express = require("express");
const DBConnect = require("./DBConnect/dbconnect");
const crudModel = require("./models/crudModel");
const app = express();
DBConnect();
app.use(express.json());
const port = 4000;

app.post("/creatdata", async(req, res) => {
  let {name} =req.body
  let crudModel= new crudModel({
    name
  })
  await crudModel.save()
  res.status(201).send({message:"Insert Data"})
});


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

app.listen(port, (req, res) => {
  console.log(`Server is running http://localhost:${port}`);
});
