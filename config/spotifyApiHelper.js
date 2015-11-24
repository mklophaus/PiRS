var request = require('request');




module.exports = {

  getPlaylists: function(userId, token, callback) {
    request({uri: buildPlaylistUri(userId, token), json: true}, function(err, body, playlists) {
      callback(playlists);
    });
  }
/*



*/

}

