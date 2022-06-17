import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSinglePlant, setPlantCartItem } from "../store/singlePlant";
import { createCartItem } from "../store/cart_item";

class SinglePlant extends React.Component {
  componentDidMount() {
    try {
      const plantId = this.props.match.params.plantId;
      this.props.loadSinglePlant(plantId);
      //this.props.addPlantCartItem(plantId);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const plant = this.props.plant.info;
    const user = this.props.user
    const cartItems = this.props.cartItems
    //const cartItems = this.props.plant.cartItems; (DO WE WANT TO DISPLAY HOW MANY CURRENTLY IN CART?)
    console.log("user", user)
    console.log("cartItems", cartItems)
    console.log("plant", plant)
    return (
      <div>
        <h1>Plant Details:</h1>
        <div>
          <h1>{plant.name}</h1>
          <p>Description: {plant.description}</p>
          <p>Price: {plant.price}</p>
          <p>Location: {plant.location}</p>
          <p>Care: {plant.care}</p>
        </div>

        <button
          type="submit"
          onClick={() => { this.props.createCartItem(plant.id, this.props.userId) }}>
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
});

export default connect(mapState, mapDispatch)(SinglePlant);
