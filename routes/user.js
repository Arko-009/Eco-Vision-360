const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const passport =require("passport");
router.post("/signup/12", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash("error", "You are already registered. Please log in.");
            return res.redirect("/login");
        }
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "Now you can Log In");
        res.redirect("/login");
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
});

router.get("/signup",(req,res)=>{
    res.render("../views/listings/signup.ejs");
});


// --login 
router.get("/login",(req,res)=>{
res.render("../views/listings/login.ejs");
});
router.post("/login",
passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),
(req,res)=>{
    req.flash("success",`Welcome Back to Eco-Visiion ${req.user.username} !`);
    res.redirect("/Home");
}
);
//Log out ---
router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success", "You have successfully logged out!");
        res.redirect("/Home");
    });
});


module.exports = router;