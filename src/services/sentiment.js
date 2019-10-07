const axios = require('axios');

const api = axios.create({
  baseURL: 'http://financeml.herokuapp.com',
});
    
module.exports = {
  api
}
