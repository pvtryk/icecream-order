import React from 'react'
import { connect } from 'react-redux';
import SingleBox from './SingleBox/SingleBox'

import './Boxes.scss';

function Boxes(props) {
  // const transformedIcecreams = Object.keys(props.icecreams)
  //   .map(icecreamKey => {
  //     // console.log(key);
  //     return [...Array(props.icecreams[icecreamKey])].map( (_, i) => {
  //       console.log(icecreamKey );
  //     });
  //   });


  const icecreams = Object.values(props.icecreams)
    .map( icKey => {
      return icKey;
    });

  return (
    
    <div className="m-boxes">
      <div className="m-boxes__wrap">
        {icecreams.map(val => {
          return (
            <SingleBox 
              key={val.shortname}
              prices={props.prices}
              fullname={val.fullname}
              addSmallIcecream={() => props.addIcecream(val.shortname, 'small')}
              addLargeIcecream={() => props.addIcecream(val.shortname, 'large')}
              removeSmallIcecream={() => props.removeIcecream(val.shortname, 'small')}
              removeLargeIcecream={() => props.removeIcecream(val.shortname, 'large')}
              // disabledSmall={props.disabledSmall[val.shortname]['small']}
              cart={props.cart[val.shortname]}
              // disabledLarge={props.disabledLarge[val.shortname]['large']}
            />
          )
        })}
      </div>
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
