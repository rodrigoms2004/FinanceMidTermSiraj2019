const axios = require('axios');

const financial_api = axios.create({
  baseURL: 'https://financialmodelingprep.com/',
});
    
module.exports = {
    financial_api
}
