
const express = require('express');
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");


const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

app.set("port", PORT);
app.set("env", NODE_ENV);

app.use(logger("tiny"));
app.use(bodyParser.json());

var fs = require('fs');
const { randomInt } = require('crypto');

// load in the restaurant JSON object from a file
var restaurants = JSON.parse(fs.readFileSync('restaurants.json'));
var groups = JSON.parse(fs.readFileSync('groups.json'));

console.log("Succesfully read *" + Object.keys(restaurants.Restaurants).length + "* restaurants");
console.log("Succesfully read *" + Object.keys(groups.Groups).length + "* groups");

//something to check and make sure it's working. (/)
app.get('/', (req,res) => {
    res.send("Howdy.");
});

// get a JSON list of all restaurants (/listrestaurants)
app.get('/listrestaurants', (req, res) => {
    console.log('/listrestaurants');
    res.setHeader('Content-Type', 'application/json');
    console.log("ID=" + req.query.id);

    res.send(JSON.stringify(restaurants));
});

//get a JSON list of all groups
app.get('/listgroups', (req, res) => {
    console.log('/listgroups');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(groups));
});

//Uses the ID of a restaurant (/getrestaurant?id={id of the requested restaurant})
app.get('/getrestaurant', (req,res) => {
    console.log("ID=" +req.query.id);
    res.setHeader('content-Type', 'application/json');

    var toSend; //The variable that decides what to send.
    var i = 0;
    var isFound = false; //Has the restaurant been found?

    while(i < restaurants.Restaurants.length){ //Goes through every restaurant and checks the id
        //Checks the id of the restaurant and gets it ready to send if it matches the requested id.
        if(restaurants.Restaurants[i].id == req.query.id){ 
            console.log("hi");
            toSend = JSON.stringify(restaurants.Restaurants[i]);
            isFound = true;
            break;
        }
        console.log("Skipped");
        i++;
    }

    if(isFound == false){ //Checks to see if the restaurant was in the file or not
        //error message
        toSend = {Error: "No restaurant Found"}; //error.stringify
    } else {
        console.log('Successfully found a restaurant at ' + restaurants.Restaurants[i].Name);
    }
    
    res.send(toSend); //Sends the requested restaurant or a message that it wasn't working.
})

//creates and adds a group to the group file and gives back the id of the group. (/creategroup)
app.get('/creategroup', (req, res) => {
    var newGroup = { //Makes a group with an id/code and an array for the votes.
        id: randomInt(1000,10000),
        votes: []
    }

    console.log("ID = " + JSON.stringify(newGroup.id))
    for(var i = 0; i < restaurants.Restaurants.length; i++){
        newGroup.votes[i] = 0;
    }

    groups.Groups.push(newGroup);
    res.send("Group ID = " + JSON.stringify(newGroup.id));
})

/*Uses a 2D array with the IDs in y=0 and the number of votes for each id in y=1 and 
adds up the votes. (/vote?id={Id of the restaurant}&groupID={Id of the group}) */
app.get('/vote', (req, res) => {
    var hold;
    var groupId = req.query.groupid;
    var index = getGroupLocation(groupId);

    for(var i = 0; i < restaurants.Restaurants.length; i++){
        if(restaurants.Restaurants[i].id == req.query.id){
            hold = i;
            break;
        }
    }

    groups.Groups[index].votes[hold]++;
    res.send("Successful Vote");
})

//Calculates which restaurant has the most votes for that group and send back that restaurant's info
app.get('/finalvote', (req, res) => {
    var groupId = req.query.groupid;
    var index = getGroupLocation(groupId);
    var finalRest = [];
    var finalNum = 0;

    for(var i = 0; i < restaurants.Restaurants.length; i++){
        var groupString = JSON.stringify(groups.Groups[index].votes[i]);
        if(groupString >= finalNum && groupString > 0){
            finalRest.push(restaurants.Restaurants[i].id); //On the phone app: if(finalRest.length > 1){Run the program again}
            finalNum = groupString;
        } 
    }

    console.log("Success " + finalRest);
    res.send(finalRest);
})

/*Checks to see if the code you are entering actually corresponds to a created group and gives a 
success/error message. (/joingroup?id={ID of the group}) */
app.get('/joingroup', (req, res) => {
    var i = 0;
    var isFound = false; //Has the group been found?
    var toSend; //This is being passed back to the app.

    while(i < groups.Groups.length){
        if(groups.Groups[i].id == req.query.id){
            const groupID = req.query.id; //Wait is this actually used at all? Check later.
            isFound = true;
            break;
        }
        console.log("Skipped");
        i++;
    }

    if(isFound == false){ 
        //error message
        toSend = {Error: "No group Found"}; //error.stringify
    } else {
        console.log('Successfully found the group. Connecting...');
        toSend = 'Successfully found the group. Connecting...';
    }

   res.send(toSend);
})

//Gives back an array of the restaurants to the phone which holds it until it wants to check that restaurant for something else.
app.get('/getrestaurantid', (req,res) => {
    var priceTag = req.query.tag;
    var restIdArray = [];

    for(var i = 0; i < restaurants.Restaurants.length; i++){ //Goes through every restaurant and checks the id
        if(priceTag == "" || !(priceTag)){ 
            console.log("Price Check");
            restIdArray.push(restaurants.Restaurants[i].id);
        } else if(priceTag != "" && priceTag == restaurants.Restaurants[i].Price){   
            console.log("Price Check");
            restIdArray.push(restaurants.Restaurants[i].id);
        } else {
            console.log("skip");
        }
    }

    console.log(restIdArray);
    res.send(restIdArray);
});

//A method that gets the location of a group's id.  (The index)
function getGroupLocation(groupId){
    var index = 0;
    
    for(var i = 0; i < groups.Groups.length; i++){
        if(groups.Groups[i].id == groupId){
            index = i;
            break;
        }
    }
    return index;
}

app.listen(3000,() => console.log('Listening on port 3000...'));

/*
Things still to do:
- Error Messages
- Tie-breaker (do in front end)
*/