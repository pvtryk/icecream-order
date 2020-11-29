import React from 'react'
import './OrderBox.scss';

const OrderBox = props => {
  return (
    <div className="s-order-box">
      <div className="s-order-box__header">
        DATE: 
      </div>
      <div className="s-order-box__table">
        <div className="s-order-box__row">
          <div className="s-order-box__col">
            <p>Price</p>
          </div>
          <div className="s-order-box__col">
            <p>15.10 $</p>
          </div>
        </div>
        {/* row */}

      </div>
    </div>
  )
}

export default OrderBox;
