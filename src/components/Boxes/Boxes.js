import React from 'react';
import { Link } from 'react-router-dom';

import SingleBox from './SingleBox/SingleBox';
import Loader from '../UI/Loader/Loader';

import './Boxes.scss';

const Boxes = props => {

  const icecreamsObject = Object.getOwnPropertyNames(props.icecreams);
  let icereamLoaded = <Loader />

  if (icecreamsObject.length >= 1) {
    const icecreams = Object.values(props.icecreams).map((icKey) => {
      return icKey;
    });

    icereamLoaded = icecreams.map((val) => {
      return (
        <SingleBox
          key={val.shortname}
          prices={props.prices}
          fullname={val.fullname}
          shortname={val.shortname}
          variations={val.variation}
          cart={props.cart[val.shortname]}
        />
      );
    });
  } else if (props.fetchError) {
    icereamLoaded = <p className="m-boxes__error">Ouch! Something went wrong</p>;
  }
  

  return (
    <div className="m-boxes">
      <div className="m-boxes__wrap">{icereamLoaded}</div>
      <div className="m-boxes__link">
        { props.purchasable && (
          <Link to="/checkout" className="m-boxes__btn">Checkout</Link>
        )}
      </div>
    </div>
  );
}

export default Boxes;
