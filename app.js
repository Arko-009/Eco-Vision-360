const mongoose = require("mongoose");
const express = require("express");
const app = express();

// log in -----
const session = require('express-session');
const flash = require('connect-flash');

const passport = require("passport");
const LocalStrategy=require("passport-local");
const User =require("./models/User.js");

// -------


const port = 3000;
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main().then((res)=>{
    console.log("Data was connected on DB")
})
.catch((err)=>{
    console.log(err)
});
async function main() {
  await mongoose.connect('mongodb+srv://arkobag712409:V1uV3W9Clwekk8Ax@cluster0.8lvaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));



//for sign up session -------------------------------

const sessionOption = {
    secret: "supersecretkey", // use env variable in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  };
  app.use(express.json());
  
  // 1. Setup session first
  app.use(session(sessionOption));
  
  // 2. Setup flash
  app.use(flash());
  
  // 3. Initialize passport AFTER session
  app.use(passport.initialize());
  app.use(passport.session());
  
  // 4. Setup passport local strategy
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  
  // 5. Make flash and user available to templates
  app.use((req, res, next) => {
      res.locals.success = req.flash('success');
      res.locals.error = req.flash('error');
      res.locals.currentUser = req.user;
      next();
  });
  
  // 6. Mount your user routes here
  app.use("/", require("./routes/user.js"));
  
  // Optional — render signup page directly
  app.get("/signup", (req, res) => {
      res.render("listings/signup.ejs");
  });
//--------------------------------------------------




//Index Route
app.get("/listings", async(req, res)=>{
    let listings = await  Listing.find();
    res.render("listings/pindex.ejs", {listings})
});
//New Route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
});
//Show Route
app.get("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    let showListing = await Listing.findById(id);
    res.render("listings/show.ejs", {showListing});
});
//create route---
app.post("/listings", async(req, res)=>{
    const newListing  = new Listing(req.body.listing); 
    await newListing.save(); 
    res.redirect("/listings")
});
//Edit Route
app.get("/listings/:id/edit", async(req, res)=>{
    let {id} = req.params;
    let showListing = await Listing.findById(id);
    res.render("listings/edit.ejs", {showListing});
});
//Update Route
app.put("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    // console.log(updateListing);
    res.redirect(`/listings/${id}`);
});
//Delete Route
app.delete("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});
app.get("/Home", (req, res) => {
    res.render("home/index.ejs", { user: req.user });
});
app.get("/Organic_Clothing", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Organic_Clothing.html"));
})
app.get("/Reusable_Items", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Reusable_Items.html"));
})
app.get("/Eco_Gadget", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Eco_Gadget.html"));
})
app.get("/Zero_Waste_Products", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Zero_Waste_Products.html"));
})
app.get("/OurMission", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/OurMission.html"));
})
app.get("/Sustainability_Goals", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Sustainability_Goals.html"));
})
app.get("/Green_Initiatives", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Green_Initiatives.html"));
})
app.get("/Help_Center", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Help_Center.html"));
})
app.get("/Shipping_Information", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Shipping_Information.html"));
})
app.get("/Return_Policy", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Return_Policy.html"));
})
app.get("/Payment_Methods", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Payment_Methods.html"));
})
app.get("/Map", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Map.html"));
})
app.get("/Recycling", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Recycling.html"));
})
app.get("/Tips", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Tips.html"));
})
app.get("/Carbon-Calculator", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Carbon-Calculator.html"));
})
app.get("/Service", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/html/Service.html"));
})
app.listen(port, ()=>{
    console.log("Server is lisening on http://localhost:3000/Home")
});