import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Main from './components/pages/Main/Main';
import './global.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Main} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
