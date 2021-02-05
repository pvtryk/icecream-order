import React from 'react';
import { Link } from 'react-router-dom';

import SingleBox from './SingleBox/SingleBox';
import Loader from '../UI/Loader/Loader';
import prod1 from '../../assets/images/prod1.jpg'
import prod2 from '../../assets/images/prod2.jpg'
import prod3 from '../../assets/images/prod3.jpg'

import './Boxes.scss';

const Boxes = props => {

  const icecreamsObject = Object.getOwnPropertyNames(props.icecreams);
  let icecream = <Loader />

  if (icecreamsObject.length >= 1) {
    const icecreams = Object.values(props.icecreams).map((icKey) => {
      return icKey;
    });

    icecream = icecreams.map((val, index) => {
      return (
        <SingleBox
          key={val.shortname}
          prices={props.prices}
          fullname={val.fullname}
          shortname={val.shortname}
          variations={val.variation}
          cart={props.cart[val.shortname]}
          image={index % 2 ? prod1 : index % 3 ? prod3 : prod2}
        />
      );
    });
  }

  if (icecreamsObject.length === 0 && props.fetchError) {
    icecream = <p className="m-boxes__error">Ouch! Something went wrong</p>;
  }
  

  return (
    <div className="m-boxes">
      <div className="m-boxes__wrap">{icecream}</div>
      <div className="m-boxes__link">
        { props.purchasable && (
          <Link to="/checkout" className="m-boxes__btn">Checkout</Link>
        )}
      </div>
    </div>
  );
}

export default Boxes;
