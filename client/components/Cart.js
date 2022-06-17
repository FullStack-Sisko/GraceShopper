import React from "react";
import { connect } from "react-redux";
import { getAllCartItems, deleteCartItem, updateCartItem, purchaseCart, incrementCartItemQty, decrementCartItemQty } from "../store/cart_item";
import { Link } from "react-router-dom";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    // this.state={

    // }
    // this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getAllCartItems(userId);
  }

  componentDidUpdate(prevProps) {
    const userId = this.props.match.params.userId
    if (prevProps.cart.length !== this.props.cart.length) {
      console.log("hi")
      this.props.getAllCartItems(userId);
    }
  }

  render() {
    console.log("props >>>", this.props)
    console.log("cart >>>", this.props.cart)
    console.log("state >>>", this.state)
    const { cart } = this.props;
    // const { quantity } = this.props.cart.plant
    let orderTotal = 0
    return (
      <div>
        <h1>Your Cart</h1>

        <ul>
          {cart.length === 0 || (!cart[0] || !cart[0].plant) ? (
            <h3>Nothing to show</h3>
          ) : (cart.map((item) => {
            orderTotal += (item.plant.price * item.quantity)

            return (
              <div key={item.plant.id} style={{ border: "1px solid black" }}>

                <div style={{
                  textAlign: "center", margin: "15px"
                }}>
                  <div >
                    <img style={{
                      maxWidth: "150px", height: "auto"

                    }} src={item.plant.imgUrl} />
                  </div>

                  <div >
                    <h3>{item.plant.name}</h3>
                    <p> Quantity: </p>

                    <button style={{
                      margin: "5px"
                    }}
                      type="submit"
                      onClick={() => {
                        item.quantity <= 1 ? null : this.props.decrementCartItemQty(item.id, history)
                      }} >-
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      style={{
                        margin: "5px"
                      }}
                      type="submit"
                      onClick={() => {
                        item.quantity >= item.plant.inventory ? null :
                          this.props.incrementCartItemQty(item.id, history)
                      }}>
                      +
                    </button>

                    <br />
                    <button type="submit" onClick={() => {
                      const result = confirm("Are you sure you don't want to give this plant a new home?")
                      if (result) this.props.deleteCartItem(item.id, history)
                    }}>remove {item.plant.name} from cart</button>

                    <p>Price: ${item.plant.price}</p>
                    <p>Subtotal: ${item.plant.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            )
          }
          )
          )
          }

        </ul>
        <h3>Order Total Price: ${orderTotal} </h3>
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
    deleteCartItem: (cart_itemId) => dispatch(deleteCartItem(cart_itemId, history)),
    incrementCartItemQty: (cart_itemId) => dispatch(incrementCartItemQty(cart_itemId, history)),
    decrementCartItemQty: (cart_itemId) => dispatch(decrementCartItemQty(cart_itemId, history)),
  };
};

// deleteCartItem, purchaseCart, incrementCartItemQty, decrementCartItemQty

export default connect(mapState, mapDispatch)(Cart);
