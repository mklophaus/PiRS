console.log('JS loaded!');

$(document).ready(function() {

  var circles   = _.template($('#circles-template').html());
  var $destination  = $('main');

  $destination.append(circles);

  var filteredUsers = [],
      searchName    = '';


  var buildUri = function(nameInput) {
      var baseUri = 'https://api.spotify.com/v1/users/';

      var searchParam = nameInput
                        .split(",")
                        .map(function(str){
                          return encodeURIComponent(str.trim());
                        });
      return baseUri + searchParam
    }



    function doSearch(currentSearch){

    $.ajax({
      type: 'GET',
      url: buildUri(currentSearch),
      error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR.status);
      console.log(textStatus);
      console.log(errorThrown);
      $('#friend').empty();
      $('#friend').append('<p>No users match that ID</p>');
    },
      success: function(data){
        foundUser = data;
        if (foundUser.images.length > 0) {
          profileImage = foundUser.images[0].url;
        } else {
          profileImage = null;
        }

        if (profileImage) {
          $('#friend').append('<div id="proImg">');
          $('#proImg').css('background-image', 'url(' + profileImage + ')');
        } else {
          $('#friend').append('<div id="proImg">');
          $('#proImg').css('background-image', 'url(http://www.sessionlogs.com/media/icons/defaultIcon.png)');
        }


        if(foundUser.display_name) {
          $('#friend').append(foundUser.display_name);
        } else {
          $('#friend').append(foundUser.id);
        }
        $('#friend').append('<button>Add to circle</button>')
      }
    });
  }


  $('#search').on('keyup blur', function(evt) {
    var currentSearch = $('#search').val();
      $('#friend').empty();
      doSearch(currentSearch);

    // if (evt.keyCode === 13) {
    //   $('#friend').empty();
    //   doSearch(currentSearch);
    // } else {
    //   $('#friend').empty();
    //   doSearch(currentSearch);
    // }
  });

});
