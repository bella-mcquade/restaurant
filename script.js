var savedGroupId;

var listRestaurants = function(){

    const container = document.createElement('div');

    container.setAttribute('class', 'container');
    const app = document.getElementById('root');

    app.appendChild(container);
    
    var request = new XMLHttpRequest();
  
    request.open('GET', 'http://10.0.0.108:3000/listrestaurants', true);
  
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

  var creategroup = function(){

    const container = document.createElement('div');

    container.setAttribute('class', 'container');
    const app = document.getElementById('root');

    app.appendChild(container);
    
    var request = new XMLHttpRequest();
  
    request.open('GET', 'http://10.0.0.108:3000/creategroup', true);
  
    request.onload = function () {
        var data = JSON.parse(this.response);
        savedGroupID = data;
        console.log(savedGroupId);

        const groupId = document.createElement('h1');
        groupId.textContent = data;

        container.appendChild(groupId);
    }
  
    // Send request
    request.send()
  }

  var vote = function(id){
    
    var params = ("?groupid=" + savedGroupId + "&id=" + id);

    var request = new XMLHttpRequest();
  
    request.open('GET', 'http://10.0.0.108:3000/vote' + params, true);
  
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log("Voted for Restaurant ID " + data.Groups[0].id);
    }
  
    // Send request
    request.send()
  }

  var joingroup = function(){
    const container = document.createElement('div');

    container.setAttribute('class', 'container');
    const app = document.getElementById('root');

    app.appendChild(container);

    var groupId = document.getElementById('groupcode').value;
    var params = ("?groupid=" + groupId);
    savedGroupID = groupId;
    var request = new XMLHttpRequest();

  
    request.open('GET', 'http://10.0.0.108:3000/joingroup' + params, true);
  
    request.onload = function () {
        var data = JSON.parse(this.response);

        console.log(groupId);

        const success = document.createElement('h1');

        /*if(data.toSend[0] = true){
            success.textContent = "Success";
        } else {
            success.textContent = "Failure";
        }

        container.appendChild(success);*/
    }
  
    // Send request
    request.send()
  }

  var getrestaurants = function(){
    
    var request = new XMLHttpRequest();
  
    request.open('GET', 'http://10.0.0.108:3000/listrestaurants', true);
  
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
        console.log(data.Restaurants[0]);

        for(var i = 0; i < 10; i++){
            const container = document.createElement('div');
            container.setAttribute('class', 'container');
            var option = document.getElementById('option' + (i + 1));

            option.appendChild(container);
      
            const name = document.createElement('h1');
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