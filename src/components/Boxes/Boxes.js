import React from 'react';
import { connect } from 'react-redux';
import SingleBox from './SingleBox/SingleBox';
import Loader from '../UI/Loader/Loader';

import './Boxes.scss';

function Boxes(props) {
  let icereamLoaded = <Loader />

  // if (props.icecreams) {
    const icecreams = Object.values(props.icecreams).map((icKey) => {
      return icKey;
    });

    icereamLoaded = icecreams.map((val) => {
      return (
        <SingleBox
          key={val.shortname}
          prices={props.prices}
          fullname={val.fullname}
          addSmallIcecream={ () => props.addIcecream(val.shortname, 'small') }
          addLargeIcecream={ () => props.addIcecream(val.shortname, 'large') }
          removeSmallIcecream={ () => props.removeIcecream(val.shortname, 'small') }
          removeLargeIcecream={ () => props.removeIcecream(val.shortname, 'large') }
          // disabledSmall={props.disabledSmall[val.shortname]['small']}
          cart={props.cart[val.shortname]}
          // disabledLarge={props.disabledLarge[val.shortname]['large']}
        />
      );
    });
  // }

  return (
    <div className="m-boxes">
      <div className="m-boxes__wrap">{ icereamLoaded }</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    prices: state.ic.prices,
    icecreams: state.ic.icecreams,
    cart: state.ic.cart
  };
};


export default connect(mapStateToProps)(Boxes);
