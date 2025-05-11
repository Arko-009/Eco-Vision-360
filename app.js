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
  await mongoose.connect(process.env.MONGO_URI);
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



 app.get("/ourMission", (req, res)=>{
    console.log("success")
    res.render("static/ourMission.ejs")
 })

 app.get("/SustainabilityGoals", (req, res)=>{
    res.render("static/sustainabilityGoals.ejs")
 })

 app.get("/greenInitiatives", (req, res)=>{
    res.render("static/greenInitiatives.ejs")
 })

 app.get("/helpCenter", (req, res)=>{
    res.render("static/helpCenter.ejs")
 })

 app.get("/shippingInformation", (req, res)=>{
    res.render("static/shippingInformation.ejs")
 })

 app.get("/returnPolicy", (req, res)=>{
    res.render("static/returnPolicy.ejs")
 })

app.get("/paymentMethods", (req, res)=>{
    res.render("static/paymentMethods.ejs")
 })

 app.get("/organicClothing", (req, res)=>{
    res.render("static/organicClothing.ejs")
 })

 app.get("/reusableItems", (req, res)=>{
    res.render("static/reusableItems.ejs")
 })

 app.get("/ecoGadget", (req, res)=>{
    res.render("static/ecoGadget.ejs")
 })

 app.get("/zeroWasteProducts", (req, res)=>{
    res.render("static/zeroWasteProducts.ejs")
 })

 app.get("/carbonCalculator", (req, res)=>{
    res.render("static/carbonCalculator.ejs")
 })

 app.get("/tips", (req, res)=>{
    res.render("static/tips.ejs")
 })

  app.get("/service", (req, res)=>{
    res.render("static/service.ejs")
 })

  app.get("/map", (req, res)=>{
    res.render("static/map.ejs")
 })

  app.get("/recycling", (req, res)=>{
    res.render("static/recycling.ejs")
 })

app.get("/Home", (req, res) => {
    res.render("home/index.ejs", { user: req.user });
});

app.get('/', (req, res) => {
  res.redirect('/Home');
});
app.listen(port, ()=>{
    console.log("Server is lisening on http://localhost:3000/Home")
});
