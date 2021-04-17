
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

// get a JSON list of all restaurants
app.get('/listrestaurants', (req, res) => {
    console.log('/listrestaurants');
    res.setHeader('Content-Type', 'application/json');
    console.log("ID=" +req.query.id);

    res.send(JSON.stringify(restaurants));
});

//get a JSON list of all groups
app.get('/listgroups', (req, res) => {
    console.log('/listgroups');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(groups));
});

// /getrestaurant?id
//@param id; the id of the requested restaurant/
app.get('/getrestaurant', (req,res) => {
    console.log("ID=" +req.query.id);
    res.setHeader('content-Type', 'application/json');

    var toSend; //The variable that decides what to send.
    var i = 0;
    var isFound = false; //Has the restaurant been found?

    while(i < restaurants.Restaurants.length){ //Goes through every restaurant and checks the id
        if(restaurants.Restaurants[i].id == req.query.id){ //Checks the id of the restaurant and gets it ready to send if it matches the requested id.
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

//creates and adds a group to the group file and gives back the id of the group.
app.get('/creategroup', (req, res) => {
    var newGroup = {
        id: randomInt(1000,10000),
        votes: []
        //votes: 2D array here maybe with Restaurant ID and number of votes
    }

    console.log("ID = " + JSON.stringify(newGroup.id))
    for(var i = 0; i < restaurants.Restaurants.length; i++){
        newGroup.votes[i] = 0;
    }

    groups.Groups.push(newGroup);
    res.send("Group ID = " + JSON.stringify(newGroup.id));
})

//Uses a 2D array with the IDs in y=0 and the number of votes for each id in y=1 and adds up the votes.
app.get('/vote', (req, res) => {
    var hold;
    var i = 0;
    for(var i = 0; i < restaurants.Restaurants.length; i++){
        if(restaurants.Restaurants[i].id == req.query.id){
            hold = i;
            break;
        }
    }

    groups.Groups[3].votes[hold]++;
})

app.get('/finalvote', (req, res) => {
    var voteNum = 0;
    var finalRestId;

    for(var i = 0; i < restaurantsRestaurants.length; i++){
        if(groups.Groups[req.query.groupid].vote[1][i] > voteNum){
            voteNum = groups.Groups[req.query.groupid].vote[i][0];
            finalRestId = groups.Groups[req.query.groupid].vote[i][1]
        }
    }

    console.log("The chosen restaurant ID is" + finalRestId);
})

//something to check and make sure it's working.
app.get('/', (req,res) => {
    res.send("Howdy.");
});

app.listen(3000,() => console.log('Listening on port 3000...'));

/*app.get('/joingroup', (req, res) => {
    const i = 0;
    var isFound = false;
    var toSend;

    while(i < groups.Groups.length){
        if(groups.Groups[i].id == req.query.id){
            console.log("We did it BOYS");
            const groupID = req.query.id;
            toSend = {Group ID};
            isFound = true;
            break;
        }
        console.log("Skipped");
        i++;
    }

    if(isFound == false){ 
        //error message
        toSend = {Error: "No restaurant Found"}; //error.stringify
    } else {
        console.log('Successfully found the group);
    }

   res.send(toSend);
})
*/