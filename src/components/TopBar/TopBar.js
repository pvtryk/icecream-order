import React from 'react';
import { connect } from 'react-redux';

import * as action from '../../store/actions/index'

import './TopBar.scss';
import IcecreamLogo from  '../../assets/images/lzblogo.png';
import cartIcon from  '../../assets/images/i-cart.svg';

function TopBar(props) {

  // to remove
  let cartClasses = ['topbar__cart'];
  if (props.summaryType === true) {
    cartClasses.push('cart-open');
  }

  // TODO: ON ADD ITEM TO CART, HIGHLIGHT CART ICON

  return (
    <header className="topbar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="topbar__wrap">
              <div className="topbar__logo">
                <img src={IcecreamLogo} alt="Lody" />
              </div>
              <div className="topbar__icon">
                <span
                  onClick={props.openSummary}
                  className={cartClasses.join(' ')}
                >
                  <img src={cartIcon} alt="Cart" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = state =>{
  return {
    summaryType: state.ic.summaryType,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openSummary: () => dispatch(action.openSummary())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
