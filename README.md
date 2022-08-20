# GateIO nodejs api

```
https://www.npmjs.com/package/gateio-nodejs-api

```


## Installation

```
npm install gateio-nodejs-api
```


#### Authentication Required Features

      - myWallet,
      - orderCreate,
      - getOrder,
      - getOpenOrders,
      - cancelOrder,
      - withdrawalStatus,
      - withdrawals,
      - pairs,
      - trades,
      - tickers,
      - order_book,
      - history,
      - listOrders,
      - candlesticks,
      - currencies,
      - total_balance,
      - fee,
      - saved_address,
      - deposits_list,
      - withdrawals_list,
      - deposit_address,
      - currency_chains

#### Import for public endpoints
```js
const gateioApi = require('gateio')
client = gateioApi()
```
#### Import for private (auth required) endpoints
```js
const gateioApi = require('gateio')
client = gateioApi(API_KEY, API_SECRET)
```
## Usage

#### Authentication Required Methods
- ### My Wallet 

  ```js

  client.myWallet().then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  ```js
        [
          { currency: 'BTC', available: '0.00000028', locked: '0' },
          { currency: 'USDT', available: '0.000000000009', locked: '0' },
        ]
  ```
- ### currency_chains
  * @param {*} currency 
  ```js

  client.currency_chains().then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  ```js
        [
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
  ```
- ### withdrawals_list

     * @param {} currency 
     * @param {} from 
     * @param {} to 
     * @param {} limit 
  ```js

  client.withdrawals_list().then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  ```js
        [
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
  ```
  - ### deposits_list
     * @param {} currency 
     * @param {} from 
     * @param {} to 
     * @param {} limit
  ```js

  client.deposits_list().then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  ```js
        [
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
  ```
  - ### saved_address 
     * @param {*} currency 
     * @param {*} chain 
  ```js

  client.saved_address().then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  ```js
        [
            {
                "currency": "usdt",
                "chain": "TRX",
                "address": "TWYirLzw2RARB2jfeFcfRPmeuU3rC7rakT",
                "name": "gate",
                "tag": "",
                "verified": "1"
            }
       ]
  ```
  - ### fee
   * @param {*} currency_pair
  ```js

  client.fee().then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  ```js
       {
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
  ```
  - ### total_balance 
     * @param {*} currency 
       Currency unit used to calculate the balance amount. BTC, CNY, USD and USDT are allowed. USDT is the default.
  ```js

  client.total_balance('USDT').then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  ```js
        {
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
  ```
  - ### listOrders 
     * @param {*} currency_pair 
     * @param {*} status 
     * @param {} side 
     * @param {} page 
     * @param {} limit 
  ```js

  client.listOrders().then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  ```js
        [
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
  ```
- ### Create Order 
  
    * @param {*} symbol  string
    * @param {*} quantity  string
    * @param {*} price  string
    * @param {*} side  BUY,SELL
    * @param {} type  MARKET,LIMIT

  ```js
         client.orderCreate('SHIB_USDT','1000000','0.000030','sell').then(async res=>{
            console.log(res)  
          });  
  ```
  **Result:** 
  ```js
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
  ```

- ### Get Order
     * @param {*} orderId  orderID
     * @param {*} symbol 

  ```js
         client.getOrder(190597614648, 'SHIB_USDT').then(async res => {
        console.log(res)
      });
  ```
  **Result:** 
  ```js
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
  ```
- ### Get Open Orders

  ```js
       client.getOpenOrders().then(async res => {
        console.log(res)
      }); 

      client.getOpenOrders('SHIB_USDT').then(async res => {
        console.log(res)
      }); 
  ```
  **Result:**
    * Params : SHIB_USDT 
  ```js
      
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
    ```
    Null Param
     ```js
      [ { currency_pair: 'SHIB_USDT', total: 1, orders: [ [Object] ] } ]  
      ```


 - ### Cancel Order
  
   ```js
        client.cancelOrderor(190597614648, 'SHIB_USDT').then(async res => {
          console.log(res)
        });
   ```  
    **Result:** 
    ```js
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
    ```
 - ### Public Methods
   
   ```js
       client.pairs('SHIB_USDT').then(async res => {
        console.log(res)
      }) 
   ```  
    ```js
       client.trades('SHIB_USDT').then(async res => {
        console.log(res)
      }) 
   ```  

    ```js
       client.tickers('SHIB_USDT').then(async res => {
        console.log(res)
      }) 
   ```  

    ```js
       client.order_book('SHIB_USDT').then(async res => {
        console.log(res)
      }) 
   ```  
  - ### candlesticks
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
  ```js

  client.candlesticks().then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  ```js
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
  ```  

  - ### currencies

  ```js

  client.currencies().then(async res=>{
        console.log(res)  
        }); 

  ```
  **Result:** 
  * @param {*} currency 
  ```js
       {
        currency: 'BTC',
        delisted: false,
        withdraw_disabled: false,
        withdraw_delayed: false,
        deposit_disabled: false,
        trade_disabled: false,
        chain: 'BTC'
        }
  ```
    currency param is null
  ```js
    [
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
  ```