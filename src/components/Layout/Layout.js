import React, { Fragment } from 'react'
import TopBar from '../TopBar/TopBar';

const Layout = props => {

  return (
    <Fragment>
      { props.isAuth !== null ? <TopBar /> : '' }

      <main className="main">
        {props.children}
      </main>
    </Fragment>
  );
}

export default Layout
