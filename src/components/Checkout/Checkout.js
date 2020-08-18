import React from 'react';
import './Checkout.scss';

function Checkout(props) {  
  const isSomething = (
    <div className="checkout__info">
      <p>Your cart is empty</p>
    </div>
  );

  const cart = props.cart;
  const icecreams = props.icecreams;

  const summary = Object.entries(cart).map((item, index) => {
    // console.log(index);
    const fullname = icecreams[item[0]].fullname;
    return (
      <p>{fullname}</p>
    );
    // console.log('fullname: ', fullname);
    // const value = Object.entries(item[1]).map(val => {
    //   const val0 = val[0];
    //   const val1 = val[1];
    //   return (
    //     <p>val1</p>
    //   )
    // });
    // console.log(value);
  });



  // console.log(summary);
  

  return (
    <div className="checkout">
      <h2 className="checkout__title">Your Order</h2>

      {!props.purchasable && isSomething}
      {summary}
    </div>
  );
}

export default Checkout;