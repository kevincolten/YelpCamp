var Launchsite = require("../models/launchsite");
var Comment = require("../models/comment");
// all middleware goes here
var middlewareObj = {};

middlewareObj.checkLaunchsiteOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            Launchsite.findById(req.params.id, function(err, foundLaunchsite){
                if(err){
                    req.flash("error", "Launchsite not found");
                    res.redirect("back");
                } else {
                    // does user own the launchsite?
                    if(foundLaunchsite.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You need permission to do that");
                        res.redirect("back");
                    }    
                }
             });
        } else {
            req.flash("error", "You need to be logged in");
            res.redirect("back");
        }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    res.redirect("back");
                } else {
                    // does user own the comment?
                    if(foundComment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "You need to be logged in");
                        res.redirect("back");
                    }    
                }
             });
        } else {
            req.flash("error", "You need to be logged in");
            res.redirect("back");
        }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = middlewareObj;