## Create the Restaurant Tinder Service on Ubuntu
​
## Install node:
​
`$ sudo apt update`
​
## NOTE: defauly ubbuntu 20.0 node version is old, so let's install a more current version:
```
$ sudo 'curl -sL https://deb.nodesource.com/setup_15.x | bash -'
$ sudo apt install -y nodejs
```
## Check the node version (should be 15+)
`$ nodejs -v`
​
## Initial Setup of the app:
​
## Clone the github repo:
`$ git clone git@github.com:dragonfire22/restaurant.git`
​
## Run the app:
`$ node index.js`
​
##Documentation for API Interaction:
Base URL: `http://107.20.217.108:3000/`
​
# /listrestaurants
# returns: 
​
```JSON
{
  "Restaurants": [
    {
      "id": 1000,
      "Name": "Cherry Street Thai",
      "Type": "Thai restaurant",
      "Price": "$",
      "Description": "Compact, unassuming restaurant  preparing a range of traditional Thai fare with custom spice levels."
    },
    {
      "id": 1001,
      "Name": "Ezell\u2019s Famous Chicken",
      "Type": "Chicken restaurant",
      "Price": "$",
      "Description": "Local fast-food chain known for its housemade fried chicken, plus down-home sides & desserts."
    }
  ]
}
``` 
​
```/getrestaurant?id={id}
where {id} is an integer of an existing restaurnt
returns:
​
or <blah> on error
```