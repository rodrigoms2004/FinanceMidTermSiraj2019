const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api.twitter.com',
});
    
module.exports = {
  api
}
