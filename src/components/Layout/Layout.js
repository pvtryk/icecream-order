import React, { Component, Fragment } from 'react'
import TopBar from '../TopBar/TopBar';

class Layout extends Component {

  render() {
    return (
      <Fragment>
        <TopBar />
        <main>
          {this.props.children}
        </main>
      </Fragment>
    );

  }
}

export default Layout
