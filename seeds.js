var mongoose = require("mongoose");
var Launchsite = require("./models/launchsite");
var Comment = require("./models/comment");

var data = [
    {
        name: "Kennedy Space Center (NASA)",
        image:"https://cache.undercovertourist.com/tickets/kennedy-space-center-and-airboat-safari-1511.jpg",
        description: "Image by tourist - sdjsdi cjsaoidc sdkcpdo sdokfokoks oksdijeucm cspodkcdpiefj dslkksakpoweifriurfjs kskddksl ow eiweoaspdfj fmcnnakal idiwokij fjieut iwoakd cmnskal aksjdf"
    },
    {
        name: "Kennedy Space Center (NASA)2",
        image:"https://upload.wikimedia.org/wikipedia/commons/9/9b/Aerial_View_of_Launch_Complex_39.jpg",
        description: "Wiki - sdjsdi cjsaoidc sdkcpdo sdokfokoks oksdijeucm cspodkcdpiefj dslkksakpoweifriurfjs kskddksl ow eiweoaspdfj fmcnnakal idiwokij fjieut iwoakd cmnskal aksjdf"
    },
    {
        name: "Kennedy Space Center (NASA)3",
        image:"http://abcnews.go.com/images/Technology/WireAP_9d3bb2437efe476aaeac828d7e0a793e.jpg",
        description: "abc - - sdjsdi cjsaoidc sdkcpdo sdokfokoks oksdijeucm cspodkcdpiefj dslkksakpoweifriurfjs kskddksl ow eiweoaspdfj fmcnnakal idiwokij fjieut iwoakd cmnskal aksjdf"
    }
]

function seedDB(){
    // Remove all launchsites
    Launchsite.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed launchsites!")
        // add a few launchsites
        data.forEach(function(seed){
            Launchsite.create(seed, function(err, launchsite){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a launchsite");
                    // create a comment
                    Comment.create(
                        {
                            text: "Low Wi-Fi connectivity during launches",
                            author: "Elon Musk"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                launchsite.comments.push(comment);
                                launchsite.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });

    //add a few comments
}

module.exports = seedDB;