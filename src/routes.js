import React from 'react';
import Books from './components/pages/Books/Books';
import Main from './components/pages/Main/Main';
import Login from './components/pages/Login/Login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Authenticated from './components/pages/Login/auth';
import Users from './components/pages/Users/Users';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      Authenticated() ? <Component /> : <Redirect to={{ pathname: '/' }} />
    }
  />
);

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/principal" component={Main} />
        <PrivateRoute path="/produtos" component={Books} />
        <PrivateRoute path="/usuarios" component={Users} />
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
