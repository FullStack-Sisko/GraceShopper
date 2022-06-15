import React from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSinglePlant, setPlantCartItem } from "../store/singlePlant";

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
    //const cartItems = this.props.plant.cartItems; (DO WE WANT TO DISPLAY HOW MANY CURRENTLY IN CART?)

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
        <form onSubmit={(ev) => ev.preventDefault()}>
          <button
            type="submit"
            onClick={() => this.props.addPlantCartItem(plant.id)}
          >
            Add to Cart
          </button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => ({
  plant: state.plant,
  cartItems: state.cartItems,
});

const mapDispatch = (dispatch) => ({
  loadSinglePlant: (id) => dispatch(fetchSinglePlant(id)),
  //addPlantCartItem: (id) => dispatch(setPlantCartItem(id)),
});

export default connect(mapState, mapDispatch)(SinglePlant);
