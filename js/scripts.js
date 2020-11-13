 //Business logic for Places List
function PlacesList () {
  this.places = [];
  this.currentId = 0;
}


PlacesList.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places.push(place);
}

PlacesList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

PlacesList.prototype.findPlace = function(id) {
  for (let i=0; i< this.places.length; i++) {
      if (this.places[i]) {
        if (this.places[i].id == id) {
          return this.places[i];
      }  
    }
  };
  return false;
}

//Business logic for each place
function Place(location, month, days, favoriteThing) {
  this.location = location;
  this.month = month;
  this.days = days;
  this.favoriteThing = favoriteThing;
}

// User Interface Logic
let placesList = new PlacesList();

function displayPlaceDetails(placesToDisplay) {
  let placesList = $("ul#places");
  let htmlForPlaceInfo = "";
  placesToDisplay.places.forEach(function(place) {
    htmlForPlaceInfo += "<li id=" + place.id + ">" + place.location + "</li>";
  });
  placesList.html(htmlForPlaceInfo);
};

function showPlace(spot) {
  const trip = placesList.findPlace(spot);
  $("#show-place").show();
  $(".where").html(trip.location);
  $(".when").html(trip.month);
  $(".how-long").html(trip.days);
  $(".favorite-thing").html(trip.favoriteThing);
  // let buttons = $("#buttons");
  // buttons.empty();
  // buttons.append("<button class='deleteButton' id=" + trip.location + ">Delete</button>");
}

function attachPlaceListeners() {
  $("ul#places").on("click", "li", function() {
    showPlace(this.id);
  });
};

$(document).ready(function() {
  attachPlaceListeners();
  $("form#form-group").submit(function(event) {
    event.preventDefault();
    const inputtedLocation = $("input#location").val();
    const inputtedMonth = $("input#month").val();
    const inputtedDays = $("input#days").val();
    const inputtedFavoriteThings = $("input#favoriteThings").val();
    $("input#location").val("");
    $("input#month").val("");
    $("input#days").val("");
    $("input#FavoriteThings").val("");
    let newPlace = new Place(inputtedLocation, inputtedMonth, inputtedDays, inputtedFavoriteThings);
    placesList.addPlace(newPlace);
    displayPlaceDetails(placesList);
    console.log(placesList.places[0]);
  });
  
});