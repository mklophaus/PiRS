console.log('main.js loaded!');

$(document).ready(function() {

  var headerName   = _.template($('#headerName-template').html()),
      circlePrompt   = _.template($('#circlePrompt-template').html()),
      circle   = _.template($('#circle-template').html()),
      $headerDestination  = $('#welcome'),
      $promptDestination  = $('#circlePrompt'),
      $circleDestination  = $('#circlesList'),
      friendsToAdd = [],
      filteredUsers = [],
      searchName    = '',
      userId,
      friendId;
  // =============Templating=============
  // ====================================

  $headerDestination.append(headerName);
  $promptDestination.append(circlePrompt);
  $circleDestination.append(circle);
  function circleView(){

  }

  // ================Main================
  // ====================================


  function buildUri(nameInput) {
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
        console.log(data);
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
          $('#proImg').css('background-image', 'url(https://i.imgur.com/NRhYDQD.png)');
        }


        if(foundUser.display_name) {
          $('#friend').append('<div id="friendName">'+foundUser.display_name+'</div>');
        } else {
          $('#friend').append(foundUser.id);
        }
        // $('#friend').append('<input type="submit" id="addToCircle" value="Add Friend">');
      }
    });
  }

  $('#addFriend').on('click', function(){
    console.log('click');
    // var friend = $('#friend div').html();
    $('#friendsToAdd').append('<div class="addedFriend" id="'+foundUser.id+'">'+foundUser.display_name+'</div>');
    $('#friend').empty();
  });

  $('#search').on('keyup blur', function(evt) {
    var currentSearch = $('#search').val();
      $('#friend').empty();
      doSearch(currentSearch);
  });

  $('#createCircle').on('click', function(){
    var title = $('#titleField').val();
    $.each($('.addedFriend'), function(i, friend){
      friendId = $(friend).attr('id');
      friendsToAdd.push(friendId);
    });
    $.ajax({
      url: '/circles',
      type: 'POST',
      data: {
        users: JSON.stringify(friendsToAdd),
        title: title,
      },
      success: function(data){
        // new CircleView(data);
        console.log(data);
        // $('titleField').val().empty();
        // $('#search').val().empty();
        // $('#friend').empty();
        // $('#friendsToAdd').empty();
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.status);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
      render();
  });


  $('#circlesList').delegate('.stationLink', 'click', function(evt){
    evt.preventDefault();
    targettedPlayButton = evt.target;
    targettedPlayButton.src = "http://emdubb.co/ring-alt.svg";
    var id = $(this).attr('data-indexNumber');
    var title = $(this).attr('data-title');
    console.log(title);
    $.ajax({
      type: 'GET',
      url: '/testLib',
      data: {
        disId: id
      },
      success: function(data) {
        console.log(data);

        $("#playlistDest").remove()

        $('main').append('<div id="playlistDest"><iframe src="https://embed.spotify.com/?uri=spotify:trackset:'+ title +':' + data + 'height="80px" frameborder="0" allowtransparency="true"></iframe><button id="savePlaylist" data-title="' + title + '" data-trackids="' + data + '">save<br>playlist</button></div>');

        // SAVE IFRAME TO LOCAL STORAGE!!!

        console.log(targettedPlayButton.src);
        addClickToSave();

        function respondify() {
          $('iframe[src*="embed.spotify.com"]').each( function() {
            $(this).css('width',$(this).parent(3).css('width'));
            $(this).attr('src',$(this).attr('src'));
          });
        }
        // respondify();
        targettedPlayButton.src = "https://i.imgur.com/ODkyHmb.png";
      },
      error: function() {
        console.log('herb');
        var errorMessage = "Yo.. your ish is ucked. please try again!";
        $("#modal").text(errorMessage).css("color", "black").fadeIn(300);
        targettedPlayButton.src = "https://i.imgur.com/ODkyHmb.png";
      }
    });
  });

  function addClickToSave() {
    $("#savePlaylist").on('click', function(e){

      var playlistName = $(this).attr('data-title');

      var modalHtml = '<strong>Playlist "' + $(this).attr('data-title') + '" saved to Spotify!</strong><br>(you might need to restart Spotify)<br><a href="spotify:playlist:'+ playlistName +' id="openSpotifyButton">Open Spotify</a>';
      showModal(modalHtml);

      $.ajax({
        type: 'GET',
        url: '/postPlaylist',
        data: {
          title: playlistName,
          tracks: parseTrackIDs($(this).attr('data-trackids'))
        },
        success: function(data) {
          console.log('Playlist posted to Spotify');
          $("#savePlaylist").prop("disabled", true);
        },
        error: function(err) {
          console.log(err);
      }
    });
  });
  }

  function parseTrackIDs(tracks) {
    var trackSplits = tracks.split(",");
    var trackCats = trackSplits.map(function(track) {
      return("spotify:track:" + track)
    });
    console.log(trackCats)
    return trackCats
  }

  $('#circlesList').delegate('.deleteCircle', 'click', function(evt){
    var id = $(this).attr('data-indexNumber');
    $('#' + id).remove();
    $.ajax({
      method: 'DELETE',
      url: '/circles/' + id
    }).done(function(data) {
      console.log(data);
    });
  });

  $('#circlesList').delegate('.editCircle', 'click', function(evt){
    evt.preventDefault();
    var id = $(this).attr('data-indexNumber');
    $.ajax({
      method: 'GET',
      url: '/updateCircle',
      dataType: 'json',
      data: {
        _id: id
      },
      success: function(data) {
        console.log(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.status);
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  });

  $("#createCircleLink").on("click", function(e) {
    e.preventDefault();
    $("#createCircleArea").slideToggle(300);
  });

  $(".circleHeader").on('click', function() {
    var parent = $(this).parent();
    var circleMembers = $(parent).children(".circleMembers");
    var circleMembersExpanded = $(parent).children(".circleMembersExpanded");
    var playButtonAppearance = parent.children(".playButton").css("display");
    if (playButtonAppearance === "none"){
      circleMembers.hide();
      parent.css("flex-direction", "column");
      parent.children(".playButton").css("display", "block");
      playButtonAppearance = "inline-block";
      circleMembersExpanded.slideToggle(300);
    } else {
      circleMembersExpanded.slideToggle(300, function() {
        parent.children(".playButton").css("display", "none");
        parent.css("flex-direction", "row");
        circleMembers.show();
      });
    }
  });

  $('.deleteCircle').mouseover(function() {
    $(this).find("img").fadeOut(50);
  }).mouseout(function() {
    $(this).find("img").fadeIn(50);
  });

  $('#whereAmI').on('click', function() {
    console.log('clack')
    $("#moreInfoMenu").slideToggle();
    $("#moreInfoMenu").css("display", "flex");
    $("#whereAmI").fadeOut(150, function() {
      $("#gotIt").fadeIn(150);
    });
  });

  $('#gotIt').on('click', function() {
    $("#gotIt").fadeOut(150, function() {
      $("#whereAmI").fadeIn(150);
    });
    $('#moreInfoMenu').animate({left: "100%"}, 300, function(){
    $("#moreInfoMenu").hide();
    $("#moreInfoMenu").css("left", "");
    });
  });

  var showModal = function(HTML) {
    $("#modal").fadeIn(300);
    $("#modal").html(HTML)
  };

  $("#aboutPirs").on("click", function() {
    showModal("<strong>Pi Radio (PiRS) = DJ Democracy</strong><br><p>Tired of [having to be] that ONE person in control the music? PiRS builds group playlists by mixing listening preferences from any circle of Spotify users.</p> <ul><strong>How to PiRS:</strong> <li> Create a circle, search for friends by their Spotify IDs</li><li>Select a circle and click its play button</li><li>...That's it! You can push any PiRS-generated playlist to your Spotify by clicking 'save playlist' next to the Spotify player </li> </ul> Everyone - shut up and listen :)")
  })
  $("#legal").on("click", function() {
    showModal("<strong>PiRS is 100% legal.</strong><br>(ask your local attorney)")
  })
  $("#contact").on("click", function() {
    showModal("<strong>Brought to you by Boom Squad!</strong><p><a target='_blank' href='https://github.com/benjaminben'>Ben</a>, <a target='_blank' href='https://github.com/gev326'>Gev</a>, <a target='_blank' href='https://github.com/emdubb'>Melissa</a>, <a target='_blank' href='https://github.com/mklophaus'>Mike</a>, <a target='_blank' href='https://github.com/JTGA'>Judd</a></p>")
  })
  $("#settings").on("click", function() {
    showModal("coming soon!")
  })

  $("#logo").on("click", function() {
    console.log("yee");
  });

  $("#content").on("click", function() {
    if ($("#modal").css("display") != "none") {
      $("#modal").fadeOut(300);
    }
  });

});
