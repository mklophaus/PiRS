console.log('JS loaded!');

$(document).ready(function() {

var circles   = _.template($('#circles-template').html());

var $destination;

$destination  = $('main');

$destination.append(circles);

});
