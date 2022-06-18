import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSinglePlant } from "../store/singlePlant";
import { createCartItem, incrementCartItemQty, getAllCartItems } from "../store/cart_item";
import AddToCartButton from "./AddToCartButton"

class SinglePlant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: this.props.cart || [],
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    try {
      console.log("props", this.props)
      const plantId = this.props.match.params.plantId;
      this.props.loadSinglePlant(plantId);
      // this.props.getAllCartItems()
      this.props.getAllCartItems(this.props.userId)
    } catch (err) {
      console.error(err);
    }
  }

  handleClick = () => {

    console.log(this.state.cart)
    this.state.cart && this.state.cart.includes(item => item.isPurchased === false && item.plantId === this.props.match.params.plantId) ?
      console.log("item already in cart") : console.log("adding item to cart")
  }
  // this.props.createCartItem(plant.id, this.userId)



  render() {
    const plant = this.props.plant.info;
    const user = this.props.user
    const cart = this.props.cart
    // this.props.getAllCartItems(this.props.user.id)
    const userId = this.props.userId
    // const cart = this.props.getAllCartItems(user.id)

    //const cartItems = this.props.plant.cartItems; (DO WE WANT TO DISPLAY HOW MANY CURRENTLY IN CART?)

    console.log("props", this.props)


    return (
      <div>
        <h1>Plant Details:</h1>
        <div>
          <h1>{plant.name}</h1>
          <p>Description: {plant.description}</p>
          <p>Price: {plant.price}</p>
          <p>Location: {plant.location}</p>
          <p>Care: {plant.care}</p>
          <p>Stock: {plant.inventory ? <span>item in stock</span> : <span>item out of stock</span>}</p>
        </div>

        {plant.inventory === 0 ? null : (
          <button className="btn"
            type="submit"
            onClick={() => {
              alert(`${plant.name} has been added to your cart`)
              this.props.createCartItem(plant.id, userId)
            }}

          //   //check if this user has this plant is already in this users cart and isPurchased is false... need to access foreign key of users' cart_items

          //   (this.state.cart.includes(item => (item.id === user.id && item.isPurchased === false)) ?

          //   incrementCartItemQty : (cart_itemId) => dispatch(incrementCartItemQty(cart_itemId, history));

          //   alert("item was already in cart, cart total updated")

          //create new cart item if doesn't already exist as unpurchased cart item

          >
            Add to Cart
          </button>)}

      </div>
    );
  }
}


const mapState = (state) => ({
  plant: state.plant,
  cart: state.cart,
  userId: state.auth.id,
  user: state.auth
});

const mapDispatch = (dispatch, { history }) => ({
  loadSinglePlant: (id) => dispatch(fetchSinglePlant(id, history)),
  createCartItem: (plantId, userId) => dispatch(createCartItem(plantId, userId, history)),
  incrementCartItemQty: (cart_itemId) => dispatch(incrementCartItemQty(cart_itemId, history)),
  getAllCartItems: (userId) => dispatch(getAllCartItems(userId, history)),
});

export default connect(mapState, mapDispatch)(SinglePlant);
