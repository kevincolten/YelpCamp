var express     = require("express");
var router      = express.Router({mergeParams: true});
var Launchsite  = require("../models/launchsite");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

// COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find launchsite by is
        console.log(req.params.id);
        Launchsite.findById(req.params.id, function(err, launchsite){
            if(err){
                console.log(err);
            } else {
                res.render("comments/new", {launchsite: launchsite});
            }
        })
});

// COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup launchsite using ID
    Launchsite.findById(req.params.id, function(err, launchsite){
        if(err){
            console.log(err);
            res.redirect("/launchsites");
        } else {
        Comment.create(req.body.comment, function(err, comment){
            if(err){
                req.flash("error", "Something went wrong");
                console.log(err);
            } else {
                // add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // save comment
                comment.save();
                launchsite.comments.push(comment);
                launchsite.save();
                console.log(comment);
                req.flash("success", "Successfully added comment");
                res.redirect('/launchsites/' + launchsite._id);
            }
        });
        }
    });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {launchsite_id: req.params.id, comment: foundComment});
        }
    });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // findByIDAndRemove
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/launchsites/" + req.params.id)
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/launchsites/" + req.params.id);
        }
    });
});

// MIDDLEWARE

module.exports = router;