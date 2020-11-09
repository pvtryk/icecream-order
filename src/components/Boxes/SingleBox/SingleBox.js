import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';

import './SingleBox.scss';
import BoxImage from '../../../assets/images/icecream-box.jpg';

function SingleBox(props) {
  return (
    <div className="s-box">
      <div className="s-box__image">
        <img src={BoxImage} alt=""/>
      </div>
      <p className="s-box__name">{props.fullname}</p>
      <div className="s-box__options">
        {
          props.variations.map(variation => {
            return (
              <div className="s-box__item" key={variation.type}>
                <p className="s-box__type">{variation.type}</p>
                <button
                  onClick={() =>
                    props.onIcecreamAdd(props.shortname, variation.type, variation.price)
                  }
                  className="s-box__btn"
                >
                  +
                </button>
                <button
                  onClick={() =>
                    props.onIcecreamRemove(props.shortname, variation.type, variation.price)
                  }
                  disabled={props.cart[variation.type] <= 0 ? true : false}
                  className="s-box__btn"
                >
                  -
                </button>
                <p className="s-box__price">{variation.price.toFixed(2)} $</p>
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
