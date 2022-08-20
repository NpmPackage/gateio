/**
 * autor    : Baris Demir  
 * Github   : barisdemir49
 * Twitter  : btc_barisdemir
 * linkedin : barisdemir49
 * web      : botcex.com
 * info     : This service was created simply for GateIO spot API transactions. The heavily used processes were simplified and coded on a single page.
 */

 const crypto = require('crypto');
 const axios = require('axios');
 
 module.exports = function (apiKey = null, apiSecret = null) {
 
     const API_KEY = apiKey;
     const API_SECRET = apiSecret;
     let que = {}
     let sign = ""
     let Timestamp = (new Date().getTime() / 1000).toString()
     let path = ""
 
     const API_BASE = 'https://api.gateio.ws';
 
     // header data
     function _getHeaders() {
         return {
             "KEY": API_KEY,
             "Timestamp": Timestamp,
             "X-Gate-Channel-Id": 'botcex',
             "Content-Type": 'application/json',
             "SIGN": sign
         }
     }
     // queryBuilder url data
     function queryBuilder(obj) {
         var str = [];
         for (var p in obj)
             if (obj.hasOwnProperty(p)) {
                 str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
             }
         return str.join("&");
     }
     async function _getAuth(url) {
 
         return new Promise((resolve, reject) => {
 
             Timestamp = (new Date().getTime() / 1000).toString();
             query = queryBuilder(que);
             const hashedPayload = crypto.createHash('sha512').update('').digest('hex');
             const signatureString = ['GET', path, query, hashedPayload, Timestamp].join('\n');
             sign = crypto.createHmac('sha512', API_SECRET).update(signatureString).digest('hex');
 
             axios.get(url.toString(), { headers: _getHeaders() })
                 .then(res => resolve(res))
                 .catch(err => {
                     reject(_errorMessage(err));
                 });
         });
 
     }
     function _postAuth(url) {
         return new Promise((resolve, reject) => {
 
             Timestamp = (new Date().getTime() / 1000).toString();
             query = JSON.stringify(que);
             const body_hash = crypto.createHash('sha512').update(query).digest('hex')
             const sign_string = "POST" + "\n" + path + "\n" + "" + "\n" + body_hash + "\n" + Timestamp;
             sign = crypto.createHmac('sha512', API_SECRET).update(sign_string).digest('hex');
 
             axios.post(url.toString(), query, { headers: _getHeaders() })
                 .then(res => resolve(res))
                 .catch(err => {
                     reject(_errorMessage(err));
                 });
         });
     }
     function _deleteAuth(url) {
         return new Promise((resolve, reject) => {
 
             Timestamp = (new Date().getTime() / 1000).toString();
             query = queryBuilder(que);
             const hashedPayload = crypto.createHash('sha512').update('').digest('hex');
             const signatureString = ['DELETE', path, query, hashedPayload, Timestamp].join('\n');
             sign = crypto.createHmac('sha512', API_SECRET).update(signatureString).digest('hex');
 
             axios.delete(url.toString(), { headers: _getHeaders() })
                 .then(res => resolve(res))
                 .catch(err => {
                     reject(_errorMessage(err));
                 });
         })
     }
 
     function _get(url) {
         return new Promise((resolve, reject) => {
             axios.get(url.toString())
                 .then(res => resolve(res))
                 .catch(err => {
                     reject(_errorMessage(err));
                 });
         });
     }
 
     function _errorMessage(error) {
 
         const statusCode = error.response.status.toString();
         const statusText = error.response.statusText;
         const message = error.response.data.message;
         const res = {
             statusCode,
             statusText,
             message
         };
         console.log(res)
         return res
     }
 
 
     // Private End Point
     /**
      * 
      * @param {*} assets 
      * @returns  
     [
         { currency: 'BTC', available: '0.00000028', locked: '0' },
         { currency: 'USDT', available: '0.000000000009', locked: '0' },
     ]
      */
     async function myWallet(assets = "") {
         try {
             if (assets)
                 que = {
                     currency: assets
                 }
             path = '/api/v4/spot/accounts'
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
 
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {*} currency 
      * Currency unit used to calculate the balance amount. BTC, CNY, USD and USDT are allowed. USDT is the default.
      * @returns 
      * {
         total: { amount: '65.6720817126853324', currency: 'USDT' },
         details: {
             cbbc: { amount: '0', currency: 'USDT' },
             cross_margin: { amount: '0', currency: 'USDT' },
             delivery: { amount: '0', currency: 'USDT' },
             finance: { amount: '0', currency: 'USDT' },
             futures: { amount: '0', currency: 'USDT' },
             margin: { amount: '0', currency: 'USDT' },
             quant: { amount: '0', currency: 'USDT' },
             spot: { amount: '65.6720817126853324', currency: 'USDT' }
         }
         }
      */
     async function total_balance(currency = "") {
         try {
             if (currency)
                 que = {
                     currency
                 }
             path = '/api/v4/wallet/total_balance'
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
 
             throw new Error(error.message || error)
         }
     }
 
     /**
      * 
      * @param {*} currency_pair 
      * @returns 
      * {
         "user_id": 10001,
         "taker_fee": "0.002",
         "maker_fee": "0.002",
         "futures_taker_fee": "-0.00025",
         "futures_maker_fee": "0.00075",
         "gt_discount": false,
         "gt_taker_fee": "0",
         "gt_maker_fee": "0",
         "loan_fee": "0.18",
         "point_type": "1"
         }
      */
     async function fee(currency_pair = "") {
         try {
             if (currency_pair)
                 que = {
                     currency_pair
                 }
             path = '/api/v4/wallet/fee'
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
 
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {*} currency 
      * @param {*} chain 
      * @returns 
      * [
             {
                 "currency": "usdt",
                 "chain": "TRX",
                 "address": "TWYirLzw2RARB2jfeFcfRPmeuU3rC7rakT",
                 "name": "gate",
                 "tag": "",
                 "verified": "1"
             }
        ]
      */
     async function saved_address(currency, chain = null) {
         try {
             que = {
                 currency
             }
             if (chain)
                 que = { ...que, chain }
             path = '/api/v4/wallet/saved_address'
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
 
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {} currency 
      * @param {} from 
      * @param {} to 
      * @param {} limit 
      * @returns 
      *  [
             {
                 "id": "210496",
                 "timestamp": "1542000000",
                 "currency": "USDT",
                 "address": "1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs",
                 "txid": "128988928203223323290",
                 "amount": "222.61",
                 "memo": "",
                 "status": "DONE",
                 "chain": "TRX"
             }
         ]
      */
     async function deposits_list(currency = null, from = null, to = null, limit = 100) {
         try {
             que = { limit }
             if (currency)
                 que = { ...que, currency }
             if (from)
                 que = { ...que, from }
             if (to)
                 que = { ...que, to }
             path = '/api/v4/wallet/deposits'
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
 
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {} currency 
      * @param {} from 
      * @param {} to 
      * @param {} limit 
      * @returns 
      * [
             {
                 "id": "210496",
                 "timestamp": "1542000000",
                 "currency": "USDT",
                 "address": "1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs",
                 "txid": "128988928203223323290",
                 "amount": "222.61",
                 "memo": "",
                 "status": "DONE",
                 "chain": "TRX"
             }
         ]
      */
     async function withdrawals_list(currency = null, from = null, to = null, limit = 100) {
         try {
             que = { limit }
             if (currency)
                 que = { ...que, currency }
             if (from)
                 que = { ...que, from }
             if (to)
                 que = { ...que, to }
             path = '/api/v4/wallet/withdrawals'
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
 
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {*} currency 
      * @returns 
      * {
       currency: 'USDT',
       address: '1CGBAFNEXWnLjUbNTp2tytS6JeNu3Phsyh',
       multichain_addresses: [
         {
           chain: 'BTC',
           address: '1CGBAFNEXWnLjUbNTp2tytS6JeNu3Phsyh',
           payment_id: '',
           payment_name: '',
           obtain_failed: 0
         },
         {
           chain: 'ETH',
           address: '0x60dE1F4098d8d765c87aaF916fA15549EC0f9B6d',
           payment_id: '',
           payment_name: '',
           obtain_failed: 0
         },
         {
           chain: 'TRX',
           address: 'TJoPxncwTgZNMrwMNWBa4BgLb6f3cLGEKg',
           payment_id: '',
           payment_name: '',
           obtain_failed: 0
         }
       ]
     }
      */
     async function deposit_address(currency) {
         try {
             que = { currency }
             path = '/api/v4/wallet/deposit_address'
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
 
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {*} currency 
      * @returns 
      * [
             {
                 chain: 'BTC',
                 name_cn: '比特币OMNI',
                 name_en: 'BTC/OMNI',
                 is_disabled: 0,
                 is_deposit_disabled: 0,
                 is_withdraw_disabled: 0
             },
             {
                 chain: 'ETH',
                 name_cn: '以太坊ERC20',
                 name_en: 'ETH/ERC20',
                 is_disabled: 0,
                 is_deposit_disabled: 0,
                 is_withdraw_disabled: 0
             },
             {
                 chain: 'TRX',
                 name_cn: '波场TRC20',
                 name_en: 'Tron/TRC20',
                 is_disabled: 0,
                 is_deposit_disabled: 0,
                 is_withdraw_disabled: 0
             }
          ]
      */
     async function currency_chains(currency) {
         try {
             que = { currency }
             path = '/api/v4/wallet/currency_chains'
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
 
             throw new Error(error.message || error)
         }
     }
 
 
     /**
     * 
     * @param {*} symbol  string
     * @param {*} quantity  string
     * @param {*} price  string
     * @param {*} side  BUY,SELL
     * @param {} type  MARKET,LIMIT
     * @returns 
                 {
             id: '190597614648',
             text: 'apiv4',
             create_time: '1660507366',
             update_time: '1660507366',
             create_time_ms: 1660507366350,
             update_time_ms: 1660507366350,
             status: 'open',
             currency_pair: 'SHIB_USDT',
             type: 'limit',
             account: 'spot',
             side: 'sell',
             amount: '1000000',
             price: '0.00003',
             time_in_force: 'gtc',
             iceberg: '0',
             left: '1000000',
             fill_price: '0',
             filled_total: '0',
             fee: '0',
             fee_currency: 'USDT',
             point_fee: '0',
             gt_fee: '0',
             gt_discount: false,
             rebated_fee: '0',
             rebated_fee_currency: 'SHIB'
         }
     */
     async function orderCreate(symbol, quantity, price, side = 'buy', type = 'limit', account = 'spot') {
         try {
             que = {
                 currency_pair: symbol,
                 amount: quantity,
                 price,
                 side,
                 type,
                 account
             }
             path = '/api/v4/spot/orders'
             return await _postAuth(`${API_BASE}${path}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
 
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {*} order_id  orderID
      * @param {*} currency_pair  
      * @returns 
      *
            {
                 id: '190597614648',
                 text: 'apiv4',
                 create_time: '1660507366',
                 update_time: '1660507366',
                 create_time_ms: 1660507366360,
                 update_time_ms: 1660507366360,
                 status: 'open',
                 currency_pair: 'SHIB_USDT',
                 type: 'limit',
                 account: 'spot',
                 side: 'sell',
                 amount: '1000000',
                 price: '0.00003',
                 time_in_force: 'gtc',
                 iceberg: '0',
                 left: '1000000',
                 fill_price: '0',
                 filled_total: '0',
                 fee: '0',
                 fee_currency: 'USDT',
                 point_fee: '0',
                 gt_fee: '0',
                 gt_discount: false,
                 rebated_fee: '0',
                 rebated_fee_currency: 'SHIB'
             } 
      */
     async function getOrder(order_id, currency_pair) {
         try {
             que = {
                 order_id,
                 currency_pair
             }
             path = `/api/v4/spot/orders/${order_id}`
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
 
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {} currency_pair 
      * @returns
      * Params : SHIB_USDT 
         [
                 {
                     id: '190597614648',
                     text: 'apiv4',
                     create_time: '1660507366',
                     update_time: '1660507366',
                     create_time_ms: 1660507366357,
                     update_time_ms: 1660507366357,
                     status: 'open',
                     currency_pair: 'SHIB_USDT',
                     type: 'limit',
                     account: 'spot',
                     side: 'sell',
                     amount: '1000000',
                     price: '0.00003',
                     time_in_force: 'gtc',
                     iceberg: '0',
                     left: '1000000',
                     fill_price: '0',
                     filled_total: '0',
                     fee: '0',
                     fee_currency: 'USDT',
                     point_fee: '0',
                     gt_fee: '0',
                     gt_discount: false,
                     rebated_fee: '0',
                     rebated_fee_currency: 'SHIB'
                 }
         ]
       no params:
       [ { currency_pair: 'SHIB_USDT', total: 1, orders: [ [Object] ] } ]  
      */
     async function getOpenOrders(currency_pair = null, limit = 100) {
         try {
             que = { limit }
             path = `/api/v4/spot/open_orders`
             if (currency_pair) {
                 que = { currency_pair, status: 'open' }
                 path = `/api/v4/spot/orders`
             }
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
 
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {*} currency_pair 
      * @param {*} status 
      * @param {} side 
      * @param {} page 
      * @param {} limit 
      * @returns 
     * [
             {
                 id: '192133015275',
                 text: '101',
                 create_time: '1660916180',
                 update_time: '1660916180',
                 create_time_ms: 1660916180111,
                 update_time_ms: 1660916180111,
                 status: 'closed',
                 currency_pair: 'GALA_USDT',
                 type: 'limit',
                 account: 'spot',
                 side: 'buy',
                 amount: '465.55',
                 price: '0.053164',
                 time_in_force: 'gtc',
                 iceberg: '0',
                 left: '0.00',
                 fill_price: '24.75003465',
                 filled_total: '24.75003465',
                 fee: '0.83799',
                 fee_currency: 'GALA',
                 point_fee: '0',
                 gt_fee: '0',
                 gt_discount: false,
                 rebated_fee_currency: 'USDT'
             }
         ]
      */
     async function listOrders(currency_pair = null, status = 'finished', side = null, page = null, limit = 100) {
         try {
 
             que = { limit, status }
             path = `/api/v4/spot/orders`
             if (currency_pair) {
                 que = { ...que, currency_pair }
             }
             if (currency_pair) {
                 que = { ...que, currency_pair }
             }
             if (side) {
                 que = { ...que, side }
             }
             if (page) {
                 que = { ...que, page }
             }
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
 
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {*} order_id 
      * @param {*} currency_pair 
      * @returns 
             {
                 id: '190597614648',
                 text: 'apiv4',
                 create_time: '1660507366',
                 update_time: '1660509931',
                 create_time_ms: 1660507366350,
                 update_time_ms: 1660509931032,
                 status: 'cancelled',
                 currency_pair: 'SHIB_USDT',
                 type: 'limit',
                 account: 'spot',
                 side: 'sell',
                 amount: '1000000',
                 price: '0.00003',
                 time_in_force: 'gtc',
                 iceberg: '0',
                 left: '1000000',
                 fill_price: '0',
                 filled_total: '0',
                 fee: '0',
                 fee_currency: 'USDT',
                 point_fee: '0',
                 gt_fee: '0',
                 gt_discount: false,
                 rebated_fee: '0',
                 rebated_fee_currency: 'SHIB'
              }
      */
     async function cancelOrder(order_id, currency_pair) {
         try {
             que = {
                 order_id,
                 currency_pair
             }
             path = `/api/v4/spot/orders/${order_id}`
             return await _deleteAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
 
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
 
     /**
      * 
      * @param {} currency_pair 
      * @returns 
      * All: 
             [
               {
                 currency: 'QLC',
                 name: 'QLINK',
                 name_cn: 'QLINK',
                 deposit: '0',
                 withdraw_percent: '0%',
                 withdraw_fix: '220',
                 withdraw_day_limit: '200000',
                 withdraw_day_limit_remain: '199999',
                 withdraw_amount_mini: '220.1',
                 withdraw_eachtime_limit: '199999',
                 withdraw_fix_on_chains: { GAS_OLD: '220' }
               },
               ... 1745 more items
             ]
        Single:
                 {
                     currency: 'SHIB',
                     name: 'Shiba Inu',
                     name_cn: '柴犬币',
                     deposit: '0',
                     withdraw_percent: '0%',
                     withdraw_fix: '300000',
                     withdraw_day_limit: '34000000000',
                     withdraw_day_limit_remain: '33999999999',
                     withdraw_amount_mini: '50300000',
                     withdraw_eachtime_limit: '33999999999',
                     withdraw_fix_on_chains: { ETH: '300000' }
                 }
      */
     async function withdrawalStatus(currency = null) {
         try {
 
             path = `/api/v4/wallet/withdraw_status/`
             const res = await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
             if (currency) {
                 return res.find(item => item.currency == currency)
             }
             return res;
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
     async function withdrawals(currency = null) {
         try {
             if (currency)
                 que = {
                     currency
                 }
             path = '/api/v4/withdrawals'
             return await _postAuth(`${API_BASE}${path}`).then(res => res).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
 
     /**
      * 
      * @param {} currency_pair 
      * @returns 
          single:
          {
             id: 'SHIB_USDT',
             base: 'SHIB',
             quote: 'USDT',
             fee: '0.2',
             min_quote_amount: '1',
             amount_precision: 0,
             precision: 10,
             trade_status: 'tradable',
             sell_start: 0,
             buy_start: 0
          }
         All:
             [
                 {
                     id: 'SHIB_USDT',
                     base: 'SHIB',
                     quote: 'USDT',
                     fee: '0.2',
                     min_quote_amount: '1',
                     amount_precision: 0,
                     precision: 10,
                     trade_status: 'tradable',
                     sell_start: 0,
                     buy_start: 0
                 }
             ] 
      */
 
     async function history(currency_pair) {
         try {
             path = `/api/v4/spot/my_trades/`
             que = {
                 currency_pair
             }
             return await _getAuth(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
 
 
     /**Public End Point */
 
     /**
      * 
      * @param {*} currency_pair 
      * @returns 
      * [
             {
                 id: '3982001792',
                 create_time: '1660510735',
                 create_time_ms: '1660510734586.329000',
                 currency_pair: 'SHIB_USDT',
                 side: 'buy',
                 amount: '15832638',
                 price: '1.66548e-05'
             },
             {
                 id: '3982001791',
                 create_time: '1660510735',
                 create_time_ms: '1660510734569.091000',
                 currency_pair: 'SHIB_USDT',
                 side: 'sell',
                 amount: '27694466',
                 price: '1.66547e-05'
             }
         ]
      */
     async function trades(currency_pair) {
         try {
             path = `/api/v4/spot/trades/`
             que = {
                 currency_pair
             }
 
             return await _get(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {} currency_pair 
      * @returns
      *  Single: 
          [
             {
                 currency_pair: 'SHIB_USDT',
                 last: '0.0000167401',
                 lowest_ask: '0.0000167616',
                 highest_bid: '0.0000167483',
                 change_percentage: '32.1',
                 base_volume: '5566034512502.3',
                 quote_volume: '87073516.208452',
                 high_24h: '0.000017906',
                 low_24h: '0.0000125984'
             }
         ] 
      All: 
          [
             {
                 currency_pair: 'SHIB_USDT',
                 last: '0.0000167401',
                 lowest_ask: '0.0000167616',
                 highest_bid: '0.0000167483',
                 change_percentage: '32.1',
                 base_volume: '5566034512502.3',
                 quote_volume: '87073516.208452',
                 high_24h: '0.000017906',
                 low_24h: '0.0000125984'
             },
            {
                 currency_pair: 'ARPA_USDT',
                 last: '0.04301',
                 lowest_ask: '0.04315',
                 highest_bid: '0.04292',
                 change_percentage: '-3.21',
                 change_utc0: '-2.78',
                 change_utc8: '-3.6',
                 base_volume: '654102.96225212',
                 quote_volume: '28989.311667474',
                 high_24h: '0.04546',
                 low_24h: '0.04265'
             }
          ]
  
      */
     async function tickers(currency_pair = null) {
         try {
             path = `/api/v4/spot/tickers/`
             if (currency_pair) {
                 que = {
                     currency_pair
                 }
             }
             return await _get(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {*} currency_pair 
      * @returns 
          {
             current: 1660511177095,
             update: 1660511176926,
             asks: [
                 [ '0.0000167516', '16774825' ],
                 [ '0.000016759', '40037409' ],
                 [ '0.0000167613', '35913250' ],
                 [ '0.000016764', '81759' ],
                 [ '0.0000167652', '11051813' ],
                 [ '0.0000167674', '13453759' ],
                 [ '0.0000167675', '35321973' ],
                 [ '0.0000167696', '29807663' ],
                 [ '0.0000167717', '34477135' ],
                 [ '0.0000167722', '11394680' ]
             ],
             bids: [
                 [ '0.0000167515', '979756' ],
                 [ '0.0000167458', '42428377' ],
                 [ '0.0000167457', '41613606' ],
                 [ '0.0000167448', '8955471' ],
                 [ '0.0000167384', '10000000' ],
                 [ '0.0000167333', '17923311' ],
                 [ '0.0000167302', '13453759' ],
                 [ '0.0000167296', '240000000' ],
                 [ '0.0000167264', '32452639' ],
                 [ '0.000016725', '10715344' ]
             ]
         }
      */
     async function order_book(currency_pair) {
         try {
             path = `/api/v4/spot/order_book/`
             que = {
                 currency_pair
             }
             return await _get(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
 
     async function pairs(currency_pair = null) {
         try {
             path = `/api/v4/spot/currency_pairs/`
             if (currency_pair) {
                 que = {
                     currency_pair
                 }
                 path = path + currency_pair
             }
             return await _get(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {*} currency_pair 
      * @param {*} interval 
                         interval	10s
                         interval	1m
                         interval	5m
                         interval	15m
                         interval	30m
                         interval	1h
                         interval	4h
                         interval	8h
                         interval	1d
                         interval	7d
                         interval	30d
      * @returns
        [
             [
                 '1660829400',
                 '2068154.5862748175',
                 '23451.21',
                 '23518.9',
                 '23439.57',
                 '23518.9',
                 '88.077584055'
             ]
         ] 
      */
     async function candlesticks(currency_pair, interval = '15m') {
         try {
             path = `/api/v4/spot/candlesticks/`
             que = {
                 currency_pair,
                 interval
             }
             return await _get(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
     /**
      * 
      * @param {*} currency 
      * @returns 
      * {
         currency: 'BTC',
         delisted: false,
         withdraw_disabled: false,
         withdraw_delayed: false,
         deposit_disabled: false,
         trade_disabled: false,
         chain: 'BTC'
         }
      * @param {} currency 
      * @returns 
      * [
         {
         currency: 'BTC',
         delisted: false,
         withdraw_disabled: false,
         withdraw_delayed: false,
         deposit_disabled: false,
         trade_disabled: false,
         chain: 'BTC'
         }  
        ]   
      */
     async function currencies(currency = null) {
         try {
             path = `/api/v4/spot/currencies/`
             if (currency) {
                 que = {
                     currency
                 }
                 path = `/api/v4/spot/currencies/${currency}`
             }
             return await _get(`${API_BASE}${path}?${queryBuilder(que)}`).then(res => res.data).catch(e => {
                 throw new Error(e.message || e)
             });
         } catch (error) {
             throw new Error(error.message || error)
         }
     }
 
     return {
         myWallet,
         orderCreate,
         getOrder,
         getOpenOrders,
         cancelOrder,
         withdrawalStatus,
         withdrawals,
         pairs,
         trades,
         tickers,
         order_book,
         history,
         listOrders,
         candlesticks,
         currencies,
         total_balance,
         fee,
         saved_address,
         deposits_list,
         withdrawals_list,
         deposit_address,
         currency_chains
     };
 }