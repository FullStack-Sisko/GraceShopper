import React from "react";
import { connect } from "react-redux";
import { createCartItem, getAllCartItems, deleteCartItem, updateCartItem, purchaseCart, incrementCartItemQty, decrementCartItemQty, saveForLater, moveSavedToCart } from "../store/cart_item";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart || [],
      plant: this.props.plant || {}
    }
    // this.handleIncrement = this.handleIncrement.bind(this)
    // this.handleDecrement = this.handleDecrement.bind(this)
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.props.getAllCartItems(userId);
  }

  componentDidUpdate(prevProps) {
    const userId = this.props.match.params.userId
    if (prevProps.cart.length !== this.props.cart.length) {
      console.log("component updated")
      this.props.getAllCartItems(userId);
    }
  }


  render() {

    const { cart } = this.props;

    let userId = this.props.userId
    let orderTotal = 0

    const currentCart = cart.filter((item) => item.purchaseStatus === "cart")
    const laterCart = cart.filter((item) => item.purchaseStatus === "later")
    const pastPurchased = cart.filter((item) => item.purchaseStatus === "purchased")

    return (
      <div>
        <h1 className="center cart-title title">Your Cart</h1>


        {currentCart.length === 0 || (!currentCart[0] || !currentCart[0].plant) ? (
          <div className="center">
            <h3>Looks like your cart is currently empty.</h3>

            <Link to="/plants">
              <button className="empty-cart btn">Add some plants</button></Link>

          </div>
        ) : (currentCart.map((item) => {
          { orderTotal += (item.plant.price * item.quantity) }

          return (
            <div key={item.plant.id} className="cart-item">

              <div className="cart-img-container">
                <img className="img small" src={item.plant.imgUrl} />
              </div>

              <div className="cart-info-container">
                <h3 className="cart-item-name">{item.plant.name}</h3>

                <div className="cart-info-top-container">

                  {/* */}


                  {/* quantity and add/subtract buttons */}
                  <div className="cart-item-quantity">
                    <p className="bold center"> Quantity </p>

                    <button className="btn decrement" style={{
                      margin: "5px"
                    }}
                      type="submit"
                      onClick={() => {
                        item.quantity <= 1 ? null : this.props.decrementCartItemQty(item.id, history)
                      }} >-
                    </button>

                    <span className="cart-item-quantity-number">{item.quantity}</span>

                    <button className="btn increment"
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
                  </div>
                  <div className="cart-item-price">
                    <p><span className="bold"> Price: </span>${item.plant.price}</p>
                    <p>Subtotal: ${item.plant.price * item.quantity}</p>
                  </div>
                </div>

                {/* move item to saved for later */}
                <div className="cart-info-bottom-container">
                  <button className="btn later" type="submit" onClick={() => {
                    // const result = confirm("Are you sure you'd like to remove this item from your cart and save it for later?")
                    // if (result)
                    this.props.saveForLater(item.id, history)
                  }}>save for later</button>

                  {/* remove item from cart */}
                  <button className="btn remove" type="submit" onClick={() => {
                    // const result = confirm("Are you sure you don't want to give this plant a new home?")
                    // if (result)
                    this.props.deleteCartItem(item.id, history)
                  }}>remove from cart</button>
                </div>


              </div>
            </div>
          )
        }))

        }

        {
          currentCart.length === 0 || (!currentCart[0] || !currentCart[0].plant) ? null : (<div className="checkout-total-container">
            <h3 className="center order-total">Order Total Price: ${orderTotal} </h3>

            <Link className="checkout-btn" to={`/checkout/${userId}`}>Complete Checkout</Link>

          </div>)
        }

        {/* saved for later scroll */}
        <h3 className="center section-header">Saved for Later</h3>
        <div className="scroll">
          {laterCart.map(item => {
            { console.log("item", item) }
            return (<div key={item.id} >
              <img className="scroll-item small" src={item.plant.imgUrl} alt={item.plant.name} />
              <div className="scroll-name-price-container">
                <Link to={`/plants/${item.plant.id}`}> <p> {item.plant.name}</p></Link>
                <p>${item.plant.price}</p>

              </div>
              <div className="scroll-add-x-container">
                {item.plant.inventory === 0 ? null : (
                  <button
                    className="btn scroll-btn"
                    type="submit"
                    onClick={() => {
                      alert(`${item.plant.name} has been added to your cart`)
                      this.props.moveSavedToCart(item.id)
                    }}  >
                    Add to Cart
                  </button>)}
                <button className="btn2 remove-from-saved" type="submit" onClick={() => this.props.deleteCartItem(item.id)}><FaTrash /></button>
              </div>
            </div>)
          })
          }
        </div>

        {/* previously purchased scroll */}
        <h3 className="center section-header">Previously purchased</h3>

        <div className="scroll">
          {pastPurchased.map(item => {
            { console.log("item", item) }
            return (<div key={item.id} >
              <img className="scroll-item small" src={item.plant.imgUrl} alt={item.plant.name} />
              <div className="scroll-name-price-container">
                <Link to={`/plants/${item.plant.id}`}> <p> {item.plant.name}</p></Link>
                <p>${item.plant.price}</p>
              </div>
              {item.plant.inventory === 0 ? null : (
                <button
                  className="btn scroll-btn"
                  type="submit"
                  onClick={() => {
                    alert(`${item.plant.name} has been added to your cart`)
                    this.props.createCartItem(item.plant.id, userId)
                  }} >
                  Buy it again?
                </button>)}

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
    getAllCartItems: (userId) => dispatch(getAllCartItems(userId, history)),
    deleteCartItem: (cart_itemId) => dispatch(deleteCartItem(cart_itemId, history)),
    incrementCartItemQty: (cart_itemId) => dispatch(incrementCartItemQty(cart_itemId, history)),
    decrementCartItemQty: (cart_itemId) => dispatch(decrementCartItemQty(cart_itemId, history)),
    purchaseCart: (userId) => dispatch(purchaseCart(userId, history)),
    saveForLater: (cart_itemId) => dispatch(saveForLater(cart_itemId, history)),
    moveSavedToCart: (cart_itemId) => dispatch(moveSavedToCart(cart_itemId, history)),
    createCartItem: (plantId, userId) => dispatch(createCartItem(plantId, userId, history))
  };
};

export default connect(mapState, mapDispatch)(Cart);
