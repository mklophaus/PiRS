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
      alert("No User found!");
    },
      success: function(data){
        console.log(data);
        userData = data;
        var nameDisplay = userData.display_name || userData.id;
      }

    });

  }


  $('#search').on('keypress blur', function(evt) {
    var currentSearch = $('#search').val();
    if (evt.keyCode === 13 || evt.type === 'blur') doSearch(currentSearch);
  });


  function addUserToCircle() {

    $.post('/api/circles', { fact: $('#addUser').val() }).done(function(data) {
    $('#addUser').val('');
    var updated = _.find(allUsers, function(user) {
      return user._id === data._id;
    });
    updated.facts.push(data.facts.pop());
    render();
  });

  }

});
