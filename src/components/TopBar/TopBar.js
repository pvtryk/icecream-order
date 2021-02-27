import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";

import * as action from '../../store/actions/index'

import './TopBar.scss';
import appLogo from  '../../assets/images/example-logo.png';
import cartIcon from  '../../assets/images/i-cart.svg';
import userIcon from  '../../assets/images/i-user.svg';
import ordersIcon from  '../../assets/images/i-orders-list.svg';
import logoutIcon from  '../../assets/images/i-exit.svg';

const TopBar = props => {
  const [cartElements, setCartElements] = useState(0);
  const [cartOption, setCartOption] = useState(null);
  const currentPath = useLocation().pathname;

  // todo: imporove speed - cart lagging on path change
  useEffect(() => {
    if (currentPath === '/' || currentPath === '/checkout') {
      setCartOption(
        <div
          className="topbar__icon topbar__cart"
          onClick={props.toggleSummary}
        >
          <img src={cartIcon} alt="Cart" />
          { cartElements > 0 && <span className="topbar__cart-quantity">{ cartElements }</span> }
        </div>
      );
    } else {
      setCartOption(
        <div className="topbar__icon topbar__cart">
          <Link to="/">
            <img src={cartIcon} alt="Products" />
          </Link>
        </div>
      );
    }

  }, [currentPath, setCartOption, cartElements, props.toggleSummary]);

  useEffect(() => {
    let finalValue = 0;

    for (const key in props.cart) {
      const element = props.cart[key];

      for (const value in props.cart[key]) {
        const newValue = element[value];
        finalValue += newValue;
      }
      setCartElements(finalValue);
    }
  }, [props.cart]);

  let authUrl = !props.token ? (
    <Link to="/auth">
      <img src={userIcon} alt="User profile" />
    </Link>
  ) : (
    <Link to="/logout">
      <img src={logoutIcon} alt="Logout" />
    </Link>
  );

  return (
    <header className="topbar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="topbar__wrap">
              <Link to="/" className="topbar__logo">
                <img src={appLogo} alt="Logo" />
              </Link>
              <div className="topbar__icons">
                <div className="topbar__icon topbar__auth">{authUrl}</div>
                {props.token && (
                  <>
                    <div className="topbar__icon topbar__user">
                      <Link to="/profile">
                        <img src={userIcon} alt="User profile" />
                      </Link>
                    </div>
                    <div className="topbar__icon topbar__user">
                      <Link to="/orders">
                        <img src={ordersIcon} alt="User profile" />
                      </Link>
                    </div>
                  </>
                )}

                { cartOption }

              </div>
              {/* __icons */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = state => {
  return {
    summaryType: state.ic.summaryType,
    token: state.auth.token,
    cart: state.ic.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSummary: () => dispatch(action.toggleSummary())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
