import React from "react";
import { connect } from "react-redux";
import { getAllCartItems, deleteCartItem, purchaseCart, incrementCartItemQty, decrementCartItemQty } from "../store/cart_item";
import { Link } from "react-router-dom";

export class Cart extends React.Component {

  componentDidMount() {
    this.props.getAllCartItems(this.props.match.params.userId);
  }

  render() {
    const { cart } = this.props;
    return (
      <div>
        <h1>Your Cart</h1>
        {/* <ul>
          {cart_items.length === 0 ? (
            <h3>Nothing to show</h3>
          ) : (
            cart_items.map((cart_item) => (
              <div key={cart_item.id}>
                <div>
                  <Link to={`/cart/${user.id}`}>
                    <h3>{cart_item.name}</h3>
                  </Link>
                  <p> Description: {cart_item.description}</p>
                  <p>Price: {cart_item.price}</p>
                </div>
              </div>
            ))
          )}
        </ul> */}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAllCartItems: () => dispatch(getAllCartItems(userId))
  };
};

// deleteCartItem, purchaseCart, incrementCartItemQty, decrementCartItemQty

export default connect(mapState, mapDispatch)(Cart);
