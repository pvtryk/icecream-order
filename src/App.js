import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import IcecreamContainer from './containers/IcecreamContainer/IcecreamContainer';
import Thanks from './components/Thanks/Thanks';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/thank-you" component={Thanks} />
          <Route path="/" component={IcecreamContainer} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
