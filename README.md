# GateIO nodejs api

```
https://www.npmjs.com/package/gateio

```


## Installation

```
npm install gateio
```


#### Authentication Required Features

      -  myWallet,
      -  orderCreate,
      -  getOrder,
      -  getOpenOrders,
      -  cancelOrderor,
      -  withdrawalStatus,
      -  withdrawals,
      -  pairs,
      -  trades,
      -  tickers,
      -  order_book


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

### Authentication Required Methods
- #### My Wallet 

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

- #### Create Order 
  
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

- #### Get Order
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
- #### Get Open Orders

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


 - #### Cancel Order
  
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
 - #### Public Methods
   
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