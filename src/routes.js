import React from 'react';
import Books from './components/pages/Books/Books';
import Main from './components/pages/Main/Main';
import Login from './components/pages/Login/Login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Authenticated from './components/pages/Login/auth';
import Users from './components/pages/Users/Users';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, typeAccount, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      Authenticated() && typeAccount !== 2 ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: '/principal' }} />
      )
    }
  />
);

const Routes = () => {
  const { permissions } = useSelector((state) => state);
  console.log(permissions);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/principal" component={Main} />
        <PrivateRoute
          path="/produtos"
          component={Books}
          typeAccount={permissions.typeAccount}
        />
        <PrivateRoute
          path="/usuarios"
          component={Users}
          typeAccount={permissions.typeAccount}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
