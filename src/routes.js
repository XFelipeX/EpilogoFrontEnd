import React from 'react';
import Books from './components/pages/Books/Books';
import Main from './components/pages/Main/Main';
import Login from './components/pages/Login/Login';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Authenticated from './components/pages/Login/auth';
import Users from './components/pages/Users/Users';
import { useSelector } from 'react-redux';
import CreateAcc from './components/pages/CreateAcc/CreateAcc';
import MyAccount from './components/pages/MyAccount/MyAccount';
import Cart from './components/pages/Cart/Cart';

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

const PrivateRouteClient = ({ component: Component, typeAccount, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      Authenticated() && typeAccount === 2 ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: '/produtos' }} />
      )
    }
  />
);

const Routes = () => {
  const { permissions } = useSelector((state) => state);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/principal" component={Main} />
        <Route path="/cadastro" component={CreateAcc} />
        <Route path="/carrinho" component={Cart} />
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
        <PrivateRouteClient
          path="/minhaconta"
          component={MyAccount}
          typeAccount={permissions.typeAccount}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
