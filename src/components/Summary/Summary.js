import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SummaryItem from './SummaryItem/SummaryItem';

import './Summary.scss';

function Summary(props) {
  
  const isSomething = (
    <div className="summary__info">
      <p>Your cart is empty</p>
    </div>
  );

  const {cart, icecreams} = props;

  // TODO HERE: 
  // 1. IF IN CART IS SOMETHING - DISPLAY IT.
  // 2. SHOW PRORUCT VARIATIONS

  let prices = [];
  const summaryItems = Object.keys(cart).map(key => {
    const ic = icecreams[key].variation;
    // console.log(Object.keys(ic).find((key) => ic[key] === 'small'));
    // console.log(ic);
    const name = icecreams[key].fullname;
    const shortName = icecreams[key].shortname;
    const itemCart = cart[key];


    for (const single in ic) {
      const element = ic[single];
      prices[shortName] = {
        ...prices[shortName],
        [element.type]: element.price,
      };
    }

    // console.log(prices);

  
    
    return Object.keys(itemCart).map((size) => {
      const price = prices[shortName][size];
      const value = itemCart[size];
      console.log(value);

      if (value !== 0) {
        return <SummaryItem key={shortName + size} name={name} shortName={shortName} size={size} ic={icecreams} price={price} value={value} />;
      }
    });

  });

  // let small = 0; // let large = 0;
  const OLDsummaryItems = Object.keys(cart).map(igKey => {
      return [...Array(cart[igKey])].map(value => {
        if (value.small >= 1 || value.large >= 1) {
          // small = small + value.small;
          // large = large + value.large;

          return (
            <SummaryItem
            key={icecreams[igKey].shortname}
            // prices={prices}
            // small={value.small}
            // large={value.large}
            // name={icecreams[igKey].fullname}
            />
          );
        }
        return false;
      });
    });
   

  return (
    <div className="summary">
      <h2 className="summary__title">Your Order</h2>

      {!props.purchasable && isSomething}

      <ol className="summary__list">{summaryItems}</ol>

      {props.purchasable && (
        <div className="summary__footer">
          <div className="summary__summary">
            <p>Summary: {props.totalPrice.toFixed(2)} $</p>
            <div className="summary__btn-wrap">
              <Link to="/checkout" className="summary__btn">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProaps = (state) => {
  return {
    icecreams: state.ic.icecreams,
    cart: state.ic.cart,
    totalPrice: state.ic.totalPrice
  };
};

export default connect(mapStateToProaps, null)(Summary);
