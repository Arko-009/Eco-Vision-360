const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");



main().then((res)=>{
    console.log("Data was connected")
})
.catch((err)=>{
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb+srv://arkobag712409:V1uV3W9Clwekk8Ax@cluster0.8lvaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}


const initDB = async ()=>{
  await Listing.deleteMany({});
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();