import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as action from '../../store/actions/index'

import './TopBar.scss';
import IcecreamLogo from  '../../assets/images/example-logo.png';
import cartIcon from  '../../assets/images/i-cart.svg';
import userIcon from  '../../assets/images/i-user.svg';

function TopBar(props) {
  // to remove
  // let cartClasses = ['topbar__cart'];
  // if (props.summaryType === true) {
  //   cartClasses.push('cart-open');
  // }

  // TODO: ON ADD ITEM TO CART, HIGHLIGHT OR BOUNCE CART ICON

  let authUrl = !props.token ? <Link to="/auth">Login</Link> : <Link to="/logout">Logout</Link>;

  return (
    <header className="topbar">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="topbar__wrap">
              <Link to="/" className="topbar__logo">
                <img src={IcecreamLogo} alt="Lody" />
              </Link>
              <div className="topbar__icons">
                <div className="topbar__auth">
                  {authUrl}
                </div>
                <div className="topbar__icon topbar__user">
                  {/* TODO: REDIRECT TO USER PROFILE PAGE */}
                  <span>
                    <img src={userIcon} alt="User profile" />
                  </span>
                </div>

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
