import React from 'react'
import './OrderBox.scss';

const OrderBox = props => {
  const { price, date } = props.data;
  const orderDate = new Date(date);

  return (
    <div className="s-order-box">
      <div className="s-order-box__header">Order date: {`${orderDate.getDate()}.${orderDate.getMonth()}.${orderDate.getFullYear()} ${orderDate.getHours()}:${orderDate.getMinutes()}`}</div>
      <div className="s-order-box__table">
        <div className="s-order-box__row">
          <div className="s-order-box__col">
            <p>Price</p>
          </div>
          <div className="s-order-box__col">
            <p>{price}$</p>
          </div>
        </div>
        {/* row */}
      </div>
    </div>
  );
}

export default OrderBox;
