import React, { Fragment } from 'react'
import TopBar from '../TopBar/TopBar';

const Layout = props => {

  return (
    <Fragment>
      <TopBar />
      <main>
        {props.children}
      </main>
    </Fragment>
  );
}

export default Layout
