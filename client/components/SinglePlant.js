import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSinglePlant } from "../store/singlePlant";
import { createCartItem, incrementCartItemQty, getAllCartItems } from "../store/cart_item";

class SinglePlant extends React.Component {
  constructor(props) {
    super(props)

  }
  componentDidMount() {
    try {
      const plantId = this.props.match.params.plantId;
      this.props.loadSinglePlant(plantId);

    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const plant = this.props.plant.info;
    const user = this.props.user
    const cartItems = this.props.cartItems
    // const userId = this.props.userId
    // const cart = this.props.getAllCartItems(user.id)

    //const cartItems = this.props.plant.cartItems; (DO WE WANT TO DISPLAY HOW MANY CURRENTLY IN CART?)
    console.log("user", user)
    console.log("cartItems", cartItems)
    console.log("plant", plant)
    // console.log("cart", cart)


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

        <button
          type="submit"
          onClick={() => {
            //check if inventory is 0 (alert "item currently out of stock")
            plant.inventory === 0 ? (alert("item currently out of stock")) : (
              //   //check if this user has this plant is already in this users cart and isPurchased is false... need to access foreign key of users' cart_items

              //   (this.state.cart.includes(item => (item.id === user.id && item.isPurchased === false)) ?

              //   incrementCartItemQty : (cart_itemId) => dispatch(incrementCartItemQty(cart_itemId, history));

              //   alert("item was already in cart, cart total updated")
              //   :


              //create new cart item if doesn't already exist as unpurchased cart item
              this.props.createCartItem(plant.id, this.props.userId)
            )
          }}>
          Add to Cart
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({
  plant: state.plant,
  cartItems: state.cartItems,
  userId: state.auth.id,
  user: state.auth
});

const mapDispatch = (dispatch) => ({
  loadSinglePlant: (id) => dispatch(fetchSinglePlant(id)),
  createCartItem: (plantId, userId) => dispatch(createCartItem(plantId, userId)),
  incrementCartItemQty: (cart_itemId) => dispatch(incrementCartItemQty(cart_itemId, history)),
  getAllCartItems: (userId) => dispatch(getAllCartItems(userId)),
});

export default connect(mapState, mapDispatch)(SinglePlant);
