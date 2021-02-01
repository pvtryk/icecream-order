import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as action from '../../store/actions/index'

import './TopBar.scss';
import appLogo from  '../../assets/images/example-logo.png';
import cartIcon from  '../../assets/images/i-cart.svg';
import userIcon from  '../../assets/images/i-user.svg';
import ordersIcon from  '../../assets/images/i-orders-list.svg';
import logoutIcon from  '../../assets/images/i-exit.svg';
import { useEffect } from 'react';

const TopBar = props => {
  // TODO: ON ADD ITEM TO CART, HIGHLIGHT OR BOUNCE CART ICON

  useEffect(() => {
    // clg
  });

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
                      {/* TODO: REDIRECT TO USER PROFILE PAGE */}
                      <Link to="/profile">
                        <img src={userIcon} alt="User profile" />
                      </Link>
                    </div>
                    <div className="topbar__icon topbar__user">
                      {/* TODO: REDIRECT TO USER PROFILE PAGE */}
                      <Link to="/orders">
                        <img src={ordersIcon} alt="User profile" />
                      </Link>
                    </div>
                  </>
                )}

                <div
                  className="topbar__icon topbar__cart"
                  onClick={props.openSummary}
                >
                  <img src={cartIcon} alt="Cart" />
                </div>
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
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openSummary: () => dispatch(action.openSummary())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
