const { fxmarket_api } = require('../services/fxmarket')
const { cryptocompare_api } = require('../services/cryptocompare')
const { financial_api } = require('../services/financialmodeling')
const { log } = require('../util/loggerTool')
const { fxmarket } = require('../config/api')
const { cryptocompare } = require('../config/api')

const { fxmarket_api_key } = fxmarket
const { cryptocompare_api_key } = cryptocompare


const displayModel = {

    getCoins: async(_asset, _class, _serie) => {
        try { 
            let config = {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                }
            }

            if (_class ==='forex' || _class ==='metal'){
                let auxdate = new Date()
                let end_date = auxdate.toISOString().split('T')[0]
                let dateOffset = (24*60*60*1000) * 180; //180 days

                auxdate.setTime(auxdate.getTime() - dateOffset);            
                let start_date =  auxdate.toISOString().split('T')[0]

                let query = {
                    params: {
                        currency : _asset,
                        start_date : start_date,
                        end_date : end_date,
                        api_key : fxmarket_api_key
                    }
                }

                const { data } = await fxmarket_api.get('/apipandas', query, config)

                return JSON.stringify(data.close)
            } else if (_class ==='cripto'){
                let coin = _serie.split("/")[0]
                let country = _serie.split("/")[1]

                let query = {
                    params: {
                        fsym : coin,
                        tsym : country,
                        limit : 180,
                        api_key : cryptocompare_api_key
                    }
                }

                const { data } = await cryptocompare_api.get('/data/v2/histominute', query, config)

                let date = new Date()
                let json_arr = {};
                for (let i in data.Data.Data){
                    date.setTime(data.Data.Data[i].time);
                    json_arr[date.toISOString()] = data.Data.Data[i].close;
                }

                if (JSON.stringify(json_arr)=='{}') {
                    return '{"2019-10-09": 0}'
                }else{
                    return JSON.stringify(json_arr)
                }
            }
            else if (_class ==='stock'){
                let query = {
                    params: {
                        serietype : 'line'
                    }
                }

                const { data } = await financial_api.get('/api/v3/historical-price-full/' + _asset, query, config)

                let json_arr = {};
                for (let i in data.historical){
                    if (data.historical[i].date > '2019-05-01')
                        json_arr[data.historical[i].date] = data.historical[i].close;
                }

                if (JSON.stringify(json_arr)=='{}') {
                    return '{"2019-10-09": 0}'
                }else{
                    return JSON.stringify(json_arr)
                }
            } else 
                return '{"2019-10-09": 0}'

        } catch (error) {
            log("displayModel", "error", `Error message ${error.message}`)
            return '{"2019-10-09": 0}'
        }    
    }

}

module.exports = displayModel