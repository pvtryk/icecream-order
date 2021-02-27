import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux';
import OrderBox from '../../components/Orders/OrderBox/OrderBox'
import Loader from '../../components/UI/Loader/Loader';

import * as action from '../../store/actions/index';

import './OrdersContainer.scss';

// TODO: v2 - advanced sorting - price, date, status
const OrdersContainer = (props) => {
  const {token, userId, onOrderGet, userOrders, loading} = props;
  const ordersObject = Object.getOwnPropertyNames(userOrders);
  let orders;

  const getOrders = useCallback(() => {
    onOrderGet(token, userId);
  }, [token, userId, onOrderGet]);

  useEffect(() => {
    if (token !== null && userId !== null) {
      getOrders();
    }

  }, [token, userId, getOrders]);

  if (loading) {
    orders = <Loader />
  }

  if (!loading && ordersObject.length >= 1) {
    // TODO: DOUBLE RENDER FUNCTION - WHAT TO DO
    const userOrdersArray = Object.values(userOrders).map((item) => {
      return item;
    });

    orders = userOrdersArray
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(single => {
        return (
          <OrderBox
              key={single.date}
              data={single}
          />
        )
      })
  }

  if (!loading && ordersObject.length === 0) {
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

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    userOrders: state.order.userOrders,
    loading: state.order.getLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderGet: (token, userId) => dispatch(action.orderGet(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);
