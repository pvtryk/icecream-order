import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import IcecreamContainer from './containers/IcecreamContainer/IcecreamContainer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <IcecreamContainer />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
