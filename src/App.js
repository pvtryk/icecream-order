import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import ProductsContainer from './containers/ProductsContainer/ProductsContainer';
import Thanks from './components/Thanks/Thanks';
import AuthContainer from './containers/AuthContainer/AuthContainer';
import OrdersContainer from './containers/OrdersContainer/OrdersContainer';
import Logout from './containers/AuthContainer/Logout/Logout';

import * as action from './store/actions/index';

import '../src/styles/app.scss';

const App = props => {

  useEffect(() => {
    props.checkAuth();
  });
  
  return (
    <div className="app-container">
      <Layout isAuth={props.token}>
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

const mapStateToProps = props => {
  return {
    token: props.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(action.checkAuthOnStart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
