import React, { Component } from 'react'
import { connect } from 'react-redux';
import OrderBox from '../../components/Orders/OrderBox/OrderBox'

import * as action from '../../store/actions/index';

import './OrdersContainer.scss';

// TODO: v2 - advanced sorting - price, date, status
export class OrdersContainer extends Component {
  state = { 
  }

  componentDidMount() {
    this.props.onOrderGet(this.props.token, this.props.userId);
  }
  
  componentDidUpdate(prevProps) {
    
    if (this.props.token !== prevProps.token) {
      this.props.onOrderGet(this.props.token, this.props.userId);
    }
  }

  render() {
    
    return (
      <section className="orders">
        <div className="orders__header">
          <h1 className="orders__title">Orders</h1>
          <p className="orders__desc">Hi, [name], there are you orders</p>
        </div>

        <div className="orders__wrap">
          <OrderBox />
        </div>
      </section>
    )
  }
}

const mapStateToProps = props => {
  return {
    token: props.auth.token,
    userId: props.auth.userId,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onOrderGet: (token, userId) => dispatch(action.orderGet(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);
