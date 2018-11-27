document.addEventListener("deviceready", function(){
  alert("Device ready Fire");
},true);

$(document).on('click', '.home', {}, function(e) {
  changeAppPage('home');
});

$(document).on('click', '#register', {}, function(e) {e.preventDefault()
  changeAppPage('register');
});

$(document).on('click', '.main', {}, function(e) {e.preventDefault()
  changeAppPage('main');
});

$(document).on('click', '.Add-Event', {}, function(e) {e.preventDefault()
  changeAppPage('Add-Event');
});

$(document).on('click', '.details', {}, function(e) {e.preventDefault()
  changeAppPage('details');
});

function changeAppPage(gameScreen) {

    var gameScreen;

    console.log("changeAppPage called " + gameScreen + " as partial view");
    $(".contentRoot").empty();
    switch (gameScreen) {

    case 'register':
    getPartialView(gameScreen);
    navHashHistory('register');
    break;

    case 'home':
    getPartialView(gameScreen);
    navHashHistory('login');
    break;

    case 'main':
    getPartialView(gameScreen);
    navHashHistory('main');
    break;

    case 'Add-Event':
    getPartialView(gameScreen);
    navHashHistory('Add Event');
    break;

    case 'details':
    getPartialView(gameScreen);
    navHashHistory('Details');
    break;
    }
}

function GetDate() {
    var d = new Date();
    var n = d.getDay();
    var x = d.getDate();

    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

    if(n === 0){
    document.getElementById("demo").innerHTML = 		"Sunday";
    document.getElementById("date").innerHTML = x;
    document.getElementById("month").innerHTML = monthNames[d.getMonth()];
    };
    if(n === 1){
    document.getElementById("demo").innerHTML = 		"Monday";
    document.getElementById("date").innerHTML = x;
    document.getElementById("month").innerHTML = monthNames[d.getMonth()];
    };
    if(n === 2){
    document.getElementById("demo").innerHTML = 		"Tuesday";
    document.getElementById("date").innerHTML = x;
    document.getElementById("month").innerHTML = monthNames[d.getMonth()];
    };
    if(n === 3){
    document.getElementById("demo").innerHTML = 		"Wednesday";
    document.getElementById("date").innerHTML = x;
    document.getElementById("month").innerHTML = monthNames[d.getMonth()];
    };
    if(n === 4){
    document.getElementById("demo").innerHTML = 		"Thursday";
    document.getElementById("date").innerHTML = x;
    document.getElementById("month").innerHTML = monthNames[d.getMonth()];
    };
    if(n === 5){
    document.getElementById("demo").innerHTML = 		"Friday";
    document.getElementById("date").innerHTML = x;
    document.getElementById("month").innerHTML = monthNames[d.getMonth()];
    };
    if(n === 6){
    document.getElementById("demo").innerHTML = 		"Saturday";
    document.getElementById("date").innerHTML = x;
    document.getElementById("month").innerHTML = monthNames[d.getMonth()];
    };

  };







//Get content
function getPartialView(screen) {
  var contentLoaded ;
  console.log("screen content injection for "+screen);
  $.get('partialViews/'+screen+'.html', function(data) {
    //inject the content into the DOM
    $(".contentRoot").append(data);
    contentLoaded = true;

  }); //end get


} //close getPartialView function


function navHashHistory(saveHash) {
  //Hash Hijack Method for SPA
  //for each new SPA partial view, add the hash to the URL bar
  var hashValue = location.hash;
  hashValue = hashValue.replace(/^#/, '');
  if (hashValue != saveHash) {
      window.history.pushState("", "", "#" + saveHash);
  } else {
      //Must be first initialise
      window.history.pushState("", "", "#" + saveHash);
  }

} //end navHashHistory


//API
var apiURL = "https://breakglass-api.azurewebsites.net/";
function apiInteract(method, url, path, params, callback) {


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.response);
        }
        if (this.status == 500) {
            changeAppPage("main");
        } else if (this.readyState == 4 && this.status !== 200) {
            setTimeout(function(){ apiInteract(method, url, path, params, callback); }, 3000);
        }

    };
    console.log(serialize(params));
    xhttp.open(method,apiURL + path + serialize(params), true);
    xhttp.send();
}

var serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}



//COOKIES

function setCookie(cname, cvalue, exdays) {
    localStorage.cname = cvalue;
}

function getCookie(cname) {
    return localStorage.getItem(cname);

}

function eraseCookie(name) {
    localStorage.removeItem(name);
}

function checkLogin() {

    if (getCookie("userID") === null) {
        console.log("user is not logged in");

        return false;
    } else {

                console.log("User is logged in");
        return true;
        };        

    }

function logOut() {
    eraseCookie("userID");
    eraseCookie("PermsID");
    eraseCookie("DepartmentID");
    eraseCookie("can_approve_req");
    changeAppPage("home");
}
console.log(getCookie("userID"));