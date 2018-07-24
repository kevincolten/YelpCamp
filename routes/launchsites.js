var express     = require("express");
var router      = express.Router();
var Launchsite  = require("../models/launchsite");
var middleware  = require("../middleware");

//INDEX - show all launchsites
router.get("/", function(req, res){
    //Get all launchsites from DB
    Launchsite.find({}, function(err, allLaunchsites){
        if(err){
            console.log(err);
        } else {
          res.render("launchsites/index", {launchsites:allLaunchsites});  
        }
    });
});

//CREATE - add new launchsite to DataBase
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to launchsite array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newLaunchsite = {name: name, price: price, image: image, description: desc, author:author}
    //Create a new launchsite and save to DB
    Launchsite.create(newLaunchsite, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to launchsite page
            console.log(newlyCreated);
            res.redirect("/launchsites");
        }
    });
});

//NEW - show form to create new launchsite
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("launchsites/new");
});

// SHOW - shows more info about one launchsite
router.get("/:id", function(req, res){
    //find the launchsite with provided ID
    Launchsite.findById(req.params.id).populate("comments").exec(function(err, foundLaunchsite){
        if(err){
            console.log(err);
        } else {
            console.log(foundLaunchsite);
            //render show template with that launchsite
            res.render("launchsites/show", {launchsite: foundLaunchsite});
        }
    });
});

// EDIT LAUNCHSITE ROUTE
router.get("/:id/edit", middleware.checkLaunchsiteOwnership, function(req, res){
    Launchsite.findById(req.params.id, function(err, foundLaunchsite){
        res.render("launchsites/edit", {launchsite: foundLaunchsite});
    });
});

// UPDATE LAUNCHSITE ROUTE
router.put("/:id", middleware.checkLaunchsiteOwnership, function(req, res){
   // find and update the correct campground
   Launchsite.findByIdAndUpdate(req.params.id, req.body.launchsite, function(err, updatedLaunchsite){
   if(err){
       res.redirect("/launchsites");
   } else {
       res.redirect("/launchsites/" + req.params.id);
   }       
   });
   // redirect somewhere(show page)
});

// DESTROY LAUNCHSITE ROUTE
router.delete("/:id", middleware.checkLaunchsiteOwnership, function(req, res){
    Launchsite.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/launchsites");
        } else {
            res.redirect("/launchsites");
        }
    });
});


// MIDDLEWARE

module.exports = router;