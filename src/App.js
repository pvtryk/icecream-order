import React from 'react';
import Layout from './components/Layout/Layout';
import IcecreamContainer from './containers/IcecreamContainer/IcecreamContainer';

function App() {
  return (
    <div className="App">
      <Layout>
        <IcecreamContainer />
      </Layout>
    </div>
  );
}

export default App;
