
//componentMount same as cart without + / 1 / save for later or remove from cart. Just name, image, price
// display items with userId and "cart" status

import React from "react";
import { connect } from "react-redux";
import { getAllCartItems, purchaseCart } from "../store/cart_item";
import { Link } from "react-router-dom";

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

  render() {

    const { cart } = this.props;

    let userId = this.props.userId
    let orderTotal = 0

    const currentCart = cart.filter((item) => item.purchaseStatus === "cart")


    return (
      <div>
        <h1 className="center cart-title title">Your Order</h1>


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

                    <span className="cart-item-quantity-number">{item.quantity}</span>

                  </div>
                  <div className="cart-item-price">
                    <p><span className="bold"> Price: </span>${item.plant.price}</p>
                    <p>Subtotal: ${item.plant.price * item.quantity}</p>
                  </div>
                </div>

              </div>
            </div>
          )
        }))

        }

        {
          currentCart.length === 0 || (!currentCart[0] || !currentCart[0].plant) ? null : (<div className="checkout-page-total-container center">
            <h3 className=" checkout-page-order-total">Order Total Price: ${orderTotal} </h3>

            <div className="checkout-page-btn">
              <button className="checkout-page btn center" type="submit" onClick={() =>
                this.props.purchaseCart(userId)
              }
              >Stripe Checkout</button>
            </div>
          </div>)
        }

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

    purchaseCart: (userId) => dispatch(purchaseCart(userId, history)),

  };
};

export default connect(mapState, mapDispatch)(Cart);
