const axios = require('axios');

module.exports = {
  authM3P: async function() {
    let response = await axios.get( 'http://147.100.175.100:8080/phenomeapi/resources/token?username=guestphis%40supagro.inra.fr&password=guestphis' )
    return response.data.session_token
  }
}
