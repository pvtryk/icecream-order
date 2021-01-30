import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux';
import OrderBox from '../../components/Orders/OrderBox/OrderBox'
import Loader from '../../components/UI/Loader/Loader';

import * as action from '../../store/actions/index';

import './OrdersContainer.scss';

// TODO: v2 - advanced sorting - price, date, status


const OrdersContainer = (props) => {

  const getOrders = useCallback(() => {
    props.onOrderGet(props.token, props.userId);
  }, [props.token, props.userId]);

  useEffect(() => {
    if (props.token !== null && props.userId !== null) {
      getOrders();
    }

  }, [props.token, props.userId]);

  const ordersObject = Object.getOwnPropertyNames(props.userOrders);
  let orders;

  if (props.loading) {
    orders = <Loader />
  }

  if (!props.loading && ordersObject.length >= 1) {
    // TODO: DOUBLE RENDER FUNCTION - WHAT TO DO

    // version 1
    const ordersArray = [];
    for (const key in props.userOrders) {
      ordersArray.push(props.userOrders[key]);
    }

    // version 2
    // const userOrders = Object.values(props.userOrders).map((item) => {
    //   return item;
    // });
    // console.log(props.userOrders);
    // console.log(userOrders)

    orders = ordersArray.map(single => {
      return (
        <OrderBox
            key={single.date}
            data={single}
        />
      )
    })
  }

  if (!props.loading && ordersObject.length === 0) {
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
