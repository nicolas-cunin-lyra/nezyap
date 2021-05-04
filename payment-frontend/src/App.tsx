import React from 'react';
import './App.css';
import BuyProduct from './buy/BuyProduct';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Transactions from './transactions/Transactions';
import TransactionDetail from './transactions/TransactionDetail';

function App() {
  return (
    <div className={'container'}>
      <BrowserRouter>
        <Switch>
          <Route path={"/users/:user/buy/:productId"} component={BuyProduct} />
          <Route path={"/users/:user/transactions/:transactionId"} component={TransactionDetail} />
          <Route path={"/users/:user/transactions/"} component={Transactions} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
