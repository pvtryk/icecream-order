import React from 'react';
import { Link } from 'react-router-dom';

import './Thanks.scss';

const Thanks = props => {
  return (
    <div className="thanks">
      <h1 className="thanks__headline">Thank you for order!</h1>
      <p className="thanks__desc">Your order will be shipped as fast as possible</p>

      <div className="thanks__wrap">
        <Link to="/" className="thanks__btn">Go to Homepage</Link>
      </div>
    </div>
  )
}

export default Thanks
