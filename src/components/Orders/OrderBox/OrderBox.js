import React from 'react'
import './OrderBox.scss';

const OrderBox = props => {
  const { price, date, formData } = props.data;
  const { firstName, secondName, address, city, email, phoneNumber, postal } = formData
  const orderDateObject = new Date(date);
  const correctDay = ("0" + orderDateObject.getDate()).slice(-2)
  const correctMonth = ("0" + (orderDateObject.getMonth() + 1)).slice(-2)

  const orderDate = `${correctDay}.${correctMonth}.${orderDateObject.getFullYear()} ${orderDateObject.getHours()}:${orderDateObject.getMinutes()}`

  return (
    <div className="s-order-box">
      <div className="s-order-box__date">Order date: <span>{ orderDate }</span></div>
      <div className="s-order-box__content">
        <p className="s-order-box__text">Price: <span>{price}$</span></p>
        <p className="s-order-box__text">Name: <span>{`${firstName} ${secondName}`}</span></p>
        <p className="s-order-box__text">Address: <span>{`${address}, ${postal} ${city}`}</span></p>
        <p className="s-order-box__text">Email: <span>{ email }</span></p>
        <p className="s-order-box__text">Phone: <span>{ phoneNumber }</span></p>
      </div>
    </div>
  );
}

export default OrderBox;
