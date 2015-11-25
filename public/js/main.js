console.log('JS loaded!');

$(document).ready(function() {

var circles   = _.template($('#circles-template').html());
var $destination  = $('main');

$destination.append(circles);

var filteredUsers = [],
    searchName    = '';

var baseUri       = 'https://api.spotify.com/v1/users/';

var buildUri = function(nameInput) {
  var searchParam = nameInput
                    .split(",")
                    .map(function(str){
                      return encodeURIComponent(str.trim());
                    });
  return baseUri + searchParam
}

$function

function applyFilterAndSort() {
  if (searchName) {
    filteredUsers = _.filter(buildUri(), function(user) {

    })
  }
}

});
