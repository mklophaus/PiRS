console.log('JS loaded!');

$(document).ready(function() {


var login     = _.template($('#login-template').html());
var circles   = _.template($('#circles').html());

var $destination,
    $templateEl;

$destination = $('#login');


$destination.append(login);

});
