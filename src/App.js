import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from "./history";

import Layout from './components/Layout/Layout';
import ProductsContainer from './containers/ProductsContainer/ProductsContainer';
import Thanks from './components/Thanks/Thanks';
import AuthContainer from './containers/AuthContainer/AuthContainer';
import OrdersContainer from './containers/OrdersContainer/OrdersContainer';
import Logout from './containers/AuthContainer/Logout/Logout';

import * as action from './store/actions/index';

import '../src/styles/app.scss';

const App = props => {
  const { token, checkAuth } = props;

  useEffect(() => {
    checkAuth();

    if (token === null) {
      history.push('/auth');
    }
  });
  
  return (
    <div className="app-container">
      <Layout isAuth={token}>
        <Switch>
          <Route path="/thank-you" component={Thanks} />
          <Route path="/auth" component={AuthContainer} />
          <Route path="/orders" component={OrdersContainer} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={ProductsContainer} />
        </Switch>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(action.checkAuthOnStart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
