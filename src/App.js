import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import IcecreamContainer from './containers/IcecreamContainer/IcecreamContainer';
import Thanks from './components/Thanks/Thanks';
import AuthContainer from './containers/AuthContainer/AuthContainer';
import OrdersContainer from './containers/OrdersContainer/OrdersContainer';
import Logout from './containers/AuthContainer/Logout/Logout';

import * as action from './store/actions/index';

class App extends Component {
  
  componentDidMount() {
    this.props.checkAuth();
  }
  
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/thank-you" component={Thanks} />
            <Route path="/auth" component={AuthContainer} />
            <Route path="/orders" component={OrdersContainer} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={IcecreamContainer} />
          </Switch>
        </Layout>
      </div>
    );
  }
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
