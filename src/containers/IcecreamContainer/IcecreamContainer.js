import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Boxes from '../../components/Boxes/Boxes';
import Summary from '../../components/Summary/Summary';
import CheckoutContainer from '../CheckoutContainer/CheckoutContainer';

import * as actionType from '../../store/actions';

import './IcecreamContainer.scss';

class IcecreamContainer extends PureComponent {
  state = {
    purchasable: false,
    purchasing: false,
  };

  componentDidMount() {
    // console.log(this.state.cart['cream']['small']);
    console.log('[icecreamContainer] mounted');
  }
  componentDidUpdate() {
    this.updatePurchase();
  }

  // temporary off
  updatePurchase() {
    let finalValue = 0;

    const cart = {
      ...this.props.cart,
    };

    for (const key in cart) {
      const element = cart[key];
      for (const value in cart[key]) {
        const newValue = element[value];
        finalValue += newValue;
      }
    }

    this.setState({
      purchasable: finalValue > 0,
    });
  }

  render() {
    return (
      <Fragment>
        <div className="icecreams">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-8 icecreams__content">
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <Boxes
                      addIcecream={this.props.onIcecreamAdd}
                      removeIcecream={this.props.onIcecreamRemove}
                    />
                  )}
                />
                <Route
                  path="/checkout"
                  render={(props) => (
                    <CheckoutContainer
                      {...this.state}
                      isAuthed={true}
                      ic={this.state.icecreams}
                    />
                  )}
                />
              </div>
              <div className="col-12 col-lg-4 icecreams__relative">
                <Summary
                  purchasable={this.state.purchasable}
                  purchasing={this.state.purchasing}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProaps = state => {
  return {
    icecreams: state.icecreams,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIcecreamAdd: (icName, icSize) => dispatch({ type: actionType.ADD_ICECREAM, icecreamName: icName, icecreamSize: icSize }),
    onIcecreamRemove: (icName, icSize) => dispatch({ type: actionType.REMOVE_ICECREAM, icecreamName: icName, icecreamSize: icSize }),
  };

}

export default connect(mapStateToProaps, mapDispatchToProps)(IcecreamContainer);
