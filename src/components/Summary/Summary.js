import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SummaryItem from './SummaryItem/SummaryItem';

import './Summary.scss';

const Summary = props => {
  const {cart, icecreams, summaryType, pagePath} = props;
  let prices = [];
  let ctaButton = null;
  let summaryClasses = ['summary'];

  if (summaryType === true) {
    summaryClasses.push('summary--mobile');
  }
  
  const isSomething = (
    <div className="summary__info">
      <p>Your cart is empty</p>
    </div>
  );

  if (pagePath) {
    ctaButton = <Link to="/checkout" className="summary__btn">Checkout</Link>
  } else {
    ctaButton = <Link to="/" className="summary__btn">Back to order</Link>
  }

  const summaryItems = Object.keys(cart).map(key => {
    const ic = icecreams[key].variation;
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
    
    return Object.keys(itemCart).map((size) => {
      const price = prices[shortName][size];
      const value = itemCart[size];

      if (value !== 0) {
        return <SummaryItem key={shortName + size} name={name} shortName={shortName} size={size} ic={icecreams} price={price} value={value} />;
      }
      return false;
    });

  });
  
  return (
    <div className={summaryClasses.join(' ')}>
      <h2 className="summary__title">Your Order</h2>

      {!props.purchasable && isSomething}

      <ol className="summary__list">{summaryItems}</ol>

      {props.purchasable && (
        <div className="summary__footer">
          <div className="summary__cart">
            <p className="summary__cart-text">Summary:</p>
            <p className="summary__cart-text summary__cart-text--value">{props.totalPrice.toFixed(2)} $</p>
          </div>

          <div className="summary__btn-wrap">
            { ctaButton }
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    icecreams: state.ic.icecreams,
    cart: state.ic.cart,
    totalPrice: state.ic.totalPrice,
    summaryType: state.ic.summaryType,
  };
};

export default connect(mapStateToProps, null)(Summary);
