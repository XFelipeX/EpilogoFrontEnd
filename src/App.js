import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Books from './components/pages/Books/Books';
import Main from './components/pages/Main/Main';
import './global.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/produtos" component={Books} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
