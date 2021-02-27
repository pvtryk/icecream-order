import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';

import './SingleBox.scss';
// import BoxImage from '../../../assets/images/placeholder-image.png';
import plusIcon from '../../../assets/images/plus-1.svg';
import minusIcon from '../../../assets/images/minus-1.svg';

const SingleBox = props => {

  return (
    <div className="s-box">
      <div className="s-box__image">
        {/*<img src={BoxImage} alt=""/>*/}
        <img src={props.image} alt=""/>
      </div>
      <div className="s-box__content">
        <p className="s-box__name">{props.fullname}</p>
        {
          props.variations.map(variation => {
            const { type, price} = variation;

            return (
              <div className="s-box__item" key={type}>
                <div className="s-box__col">
                  <p className="s-box__type">Size: <strong>{type}</strong></p>
                  <p className="s-box__price">{price.toFixed(2)} $</p>
                </div>
                <div className="s-box__col s-box__col--buttons">
                  <button
                    onClick={() =>
                      props.onIcecreamRemove(
                        props.shortname,
                        type,
                        price
                      )
                    }
                    disabled={props.cart[type] <= 0}
                    className="s-box__btn"
                  >
                    <img src={minusIcon} alt="Decrement"/>
                  </button>
                  <button
                    onClick={() =>
                      props.onIcecreamAdd(
                        props.shortname,
                        type,
                        price
                      )
                    }
                    className="s-box__btn"
                  >
                    <img src={plusIcon} alt="Increment"/>
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onIcecreamAdd: (icName, icSize, icPrice) =>
      dispatch(action.addIcecream(icName, icSize, icPrice)),
    onIcecreamRemove: (icName, icSize, icPrice) =>
      dispatch(action.removeIcecream(icName, icSize, icPrice)),
  };
}

export default connect(null, mapDispatchToProps)(SingleBox);
