import React from "react";
import { connect } from "react-redux";
import { getAllCartItems, deleteCartItem, updateCartItem, purchaseCart, incrementCartItemQty, decrementCartItemQty, saveForLater } from "../store/cart_item";
import { Link } from "react-router-dom";

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   cart: this.cart || [{ purchaseStatus: null }]
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
    let userId = this.props.userId
    let orderTotal = 0

    const currentCart = cart.filter((item) => item.purchaseStatus === "cart")
    const laterCart = cart.filter((item) => item.purchaseStatus === "later")
    const pastPurchased = cart.filter((item) => item.purchaseStatus === "purchased")

    return (
      <div>
        <h1>Your Cart</h1>
        <ul>
          {currentCart.length === 0 || (!currentCart[0] || !currentCart[0].plant) ? (
            <h3>Nothing to show</h3>
          ) : (currentCart.map((item) => {
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
                    {/* move item to save for later */}
                    <button type="submit" onClick={() => {
                      const result = confirm("Are you sure you'd like to remove this item from your cart and save it for later?")
                      if (result) this.props.saveForLater(item.id, history)
                    }}>move {item.plant.name} to "saved for later"</button>

                    {/* remove item from cart */}
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
        {/* {console.log("userId", userId)} */}
        <button type="submit" onClick={() => this.props.purchaseCart(userId)}>Complete Checkout</button>


        {/* saved for later scroll */}
        <h3>Saved for Later</h3>
        <div style={{ display: "flex", flexDirection: "row", overflowX: "scroll" }}>
          {laterCart.map(item => {
            { console.log("item", item) }
            return (<div key={item.id} style={{ marginLeft: "10px", marginRight: "10px" }}>
              <img style={{ width: "180px" }} src={item.plant.imgUrl} alt={item.plant.name} />
              <p> {item.plant.name}</p>
              <p>add to cart</p>
            </div>)
          })
          }
        </div>
        {/* previously purchased scroll */}
        <h3>Previously purchased</h3>
        <div style={{ display: "flex", flexDirection: "row", overflowX: "scroll" }}>
          {pastPurchased.map(item => {
            { console.log("item", item) }
            return (<div key={item.id} style={{ marginLeft: "10px", marginRight: "10px" }}>
              <img style={{ width: "180px" }} src={item.plant.imgUrl} alt={item.plant.name} />
              <p> {item.plant.name}</p>
              <p>buy again?</p>
            </div>)
          })
          }
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    userId: state.auth.id
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getAllCartItems: (userId) => dispatch(getAllCartItems(userId)),
    deleteCartItem: (cart_itemId) => dispatch(deleteCartItem(cart_itemId, history)),
    incrementCartItemQty: (cart_itemId) => dispatch(incrementCartItemQty(cart_itemId, history)),
    decrementCartItemQty: (cart_itemId) => dispatch(decrementCartItemQty(cart_itemId, history)),
    purchaseCart: (userId) => dispatch(purchaseCart(userId)),
    saveForLater: (cart_itemId) => dispatch(saveForLater(cart_itemId))
  };
};

// deleteCartItem, purchaseCart, incrementCartItemQty, decrementCartItemQty

export default connect(mapState, mapDispatch)(Cart);
