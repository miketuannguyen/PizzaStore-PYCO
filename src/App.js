import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import OrderTableComponent from './components/OrderTable/OrderTable.component'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
				  <Route exact path="/" component={OrderTableComponent} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
