import React, { Component } from 'react'
import { connect } from 'react-redux';
import OrderBox from '../../components/Orders/OrderBox/OrderBox'
import Loader from '../../components/UI/Loader/Loader';

import * as action from '../../store/actions/index';

import './OrdersContainer.scss';

// TODO: v2 - advanced sorting - price, date, status

class OrdersContainer extends Component {
  // TODO: OGARNAC CZEMU ROBI DWA ZAPYTANIA, PROBLEM PEWNIE Z CDM I CDU

  componentDidMount() {
    this.props.onOrderGet(this.props.token, this.props.userId);
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.props.onOrderGet(this.props.token, this.props.userId);
    }
  }

  render() {
    const ordersObject = Object.getOwnPropertyNames(this.props.userOrders);
    let orders;

    if (this.props.loading) {
      orders = <Loader />
    }

    if (ordersObject.length >= 1) {
      const userOrders = Object.values(this.props.userOrders).map((item) => {
        return item;
      });
  
      orders = userOrders.map(single => {
        console.log(single);
        return (
          <OrderBox
            key={single.date}
            data={single}
          />
        )
      })
    }

    if (!this.props.loading && ordersObject.length === 0) {
      orders = <p>You do not have any order</p>
    }

    
    return (
      <section className="orders">
        <div className="orders__header">
          <h1 className="orders__title">Orders</h1>
          <p className="orders__desc">Hi, [name], there are you orders</p>
        </div>

        <div className="orders__wrap">{orders}</div>
      </section>
    );
  }
}

const mapStateToProps = props => {
  return {
    token: props.auth.token,
    userId: props.auth.userId,
    userOrders: props.order.userOrders,
    loading: props.order.getLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderGet: (token, userId) => dispatch(action.orderGet(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);
