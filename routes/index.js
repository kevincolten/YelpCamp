var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Innovation Sites " + user.username);
            res.redirect("/launchsites");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/launchsites",
        failureRedirect: "/login",
    }), function(req, res){
});

// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/launchsites");
});

module.exports = router;