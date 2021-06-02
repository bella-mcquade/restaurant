//Global Variable that saves the group's id. NOT FUNCTIONAL
var savedGroupId;

//Global variable that saves the URL of the server.
//Development URL
//var baseurl = "http://10.0.0.108:3000";

//Production URL
var baseurl = "http://107.20.217.108:3000";

//Lists every restaurant and their price on the website. NOTE: Just a test function.
var listRestaurants = function(){

    const container = document.createElement('div');

    container.setAttribute('class', 'container');
    const app = document.getElementById('root');

    app.appendChild(container);
    
    var request = new XMLHttpRequest();
  
    request.open('GET', (baseurl + "/listrestaurants"), true);
  
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
        console.log(data.Restaurants[0]);
      
        for(var i = 0; i < data.Restaurants.length; i++){
            const name = document.createElement('h1');
            name.textContent = data.Restaurants[i].Name;

            const price = document.createElement('h3');
            price.textContent = data.Restaurants[i].Price;


            container.appendChild(name);
            container.appendChild(price);

        }
    }
  
    // Send request
    request.send()
  }

  //Calls the creategroup api and displays a number on the website.
  var creategroup = function(){

    const container = document.createElement('div');

    container.setAttribute('class', 'container');
    const app = document.getElementById('root');

    app.appendChild(container);
    
    var request = new XMLHttpRequest();
  
    request.open('GET', (baseurl + '/creategroup'), true);
  
    request.onload = function () {
        var data = JSON.parse(this.response);
        window.savedGroupId = data;
        console.log(savedGroupId);

        const groupId = document.createElement('h2');
        groupId.textContent = data;

        container.appendChild(groupId);
    }
  
    // Send request
    request.send()
  }

  //Calls the vote api by using an id submitted by the button and the saved group id. GLOBAL VARIABLE NOT FUNCTIONAL
  var vote = function(id){

    var elem = document.getElementById("b" + id);
    elem.style.backgroundColor="lightgreen";
    
    console.log("Clicked");
    
    console.log(window.savedGroupId);
    //FIGURE OUT HOW TO SEE
    var params = ("?id=" + id + "&groupid=" + window.savedGroupId);

    var request = new XMLHttpRequest();
  
    request.open('GET', (baseurl + '/vote' + params), true);
  
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
    }
  
    // Send request
    request.send()
  }

  //Calls the joingroup function and says success or failure. 
  var joingroup = function(){
    const container = document.createElement('div');

    container.setAttribute('class', 'container');
    const app = document.getElementById('root');

    app.appendChild(container);

    var groupId = document.getElementById('groupcode').value;
    var params = ("?id=" + groupId);
    savedGroupId = groupId;

    var request = new XMLHttpRequest();

  
    request.open('GET', (baseurl + '/joingroup' + params), true);
  
    request.onload = function () {
        var data = JSON.parse(this.response);
        var hold = data.Success;

        console.log(savedGroupId);
        console.log(hold);

        const success = document.createElement('h2');

        if(hold == true){
            success.textContent = "Success";
        } else {
            success.textContent = "Failure, please try again";
        }

        container.appendChild(success);
    }
  
    // Send request
    request.send()
  }

  //Displays every restaurant on the screen with the description and price.
  var getrestaurants = function(){
    
    var request = new XMLHttpRequest();
  
    request.open('GET', (baseurl + '/listrestaurants'), true);
  
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
        console.log(data.Restaurants[0]);

        for(var i = 0; i < 10; i++){
            const container = document.createElement('div');
            container.setAttribute('class', 'container');
            var option = document.getElementById('option' + (i + 1));

            option.appendChild(container);
      
            const name = document.createElement('h2');
            name.textContent = data.Restaurants[i].Name;

            const price = document.createElement('h3');
            price.textContent = data.Restaurants[i].Price;
            
            const description = document.createElement('h3');
            description.textContent = data.Restaurants[i].Description;


            container.appendChild(name);
            container.appendChild(price);
            container.appendChild(description);
        }

    }
  
    // Send request
    request.send()
  }

  //Calls finalVote and shows the winning restaurant.
  var finalvote = function(){

    const container = document.createElement('div');

    container.setAttribute('class', 'container');
    const app = document.getElementById('Results');

    app.appendChild(container);
    
    var params = ("?groupid=" + window.savedGroupId);
    var request = new XMLHttpRequest();
  
    request.open('GET', (baseurl + '/finalvote' + params), true);
  
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
        console.log(data[0].Name);
      
        for(var i = 0; i < data.length; i++){
            const name = document.createElement('h2');
            name.textContent = data[i].Name;

            const price = document.createElement('h3');
            price.textContent = data[i].Price;

            const description = document.createElement('h3');
            description.textContent = data[i].Description;


            container.appendChild(name);
            container.appendChild(price);
            container.appendChild(description);

        }
    }
  
    // Send request
    request.send()
  }

  