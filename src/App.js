import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/pages/Main/Main';
import './global.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Header />
          <Route path="/" exact component={Main} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
