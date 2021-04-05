
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

//create a group
app.get('/creategroup',(req,res) => { 
    var obj;
    fs.readFile( __dirname + "/" + "groups.json", function (err, data) {
        obj = JSON.parse( data );
        newID = randomInt(1000,10000);
        obj["Groups"].push({ID:newID});
        fs.close();
    });


    fs.appendFile( __dirname + "/" + "groups.json", obj.stringify()); 
    fs.close();
    res.end( JSON.stringify(obj));
    
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

//something to check and make sure it's working.
app.get('/', (req,res) => {
    res.send("Howdy.");
});

app.listen(3000,() => console.log('Listening on port 3000...'));

