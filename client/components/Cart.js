import React from "react";
import { connect } from "react-redux";
import { getAllCartItems, deleteCartItem, purchaseCart, incrementCartItemQty, decrementCartItemQty } from "../store/cart_item";
import { Link } from "react-router-dom";

export class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getAllCartItems(userId);
  }

  render() {
    console.log("props >>>", this.props)
    const { cart } = this.props;
    // const { quantity } = this.props.cart.plant
    let orderTotal = 0
    return (
      <div>
        <h1>Your Cart</h1>

        <ul>
          {cart.length === 0 ? (
            <h3>Nothing to show</h3>
          ) : (
            cart.map((item) => {
              orderTotal += (item.plant.price * item.quantity)

              return (
                <div key={item.plant.id} style={{ border: "1px solid black" }}>

                  <div>
                    <img style={{
                      maxWidth: "100px"
                    }} src={item.plant.imgUrl} />
                    <p>Name: {item.plant.name}</p>
                    <p> Quantity: </p>
                    <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                    <br />
                    <button type="submit" onClick={() => this.props.deleteCartItem(item.id, history)}>remove</button>
                    <p>Price: {item.plant.price}</p>
                    <p>Subtotal: {item.plant.price * item.quantity}</p>

                  </div>
                </div>
              )
            }
            )
          )
          }

        </ul>
        <h3>Order Total Price:{orderTotal} </h3>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getAllCartItems: (userId) => dispatch(getAllCartItems(userId)),
    deleteCartItem: (cart_itemId) => dispatch(deleteCartItem(cart_itemId, history))
  };
};

// deleteCartItem, purchaseCart, incrementCartItemQty, decrementCartItemQty

export default connect(mapState, mapDispatch)(Cart);
