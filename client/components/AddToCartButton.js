import React from "react";
import { connect } from "react-redux";
import { createCartItem } from "../store/cart_item";

const AddToCartButton = ({ plant }) => {

  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          alert(`${plant.name} has been added to your cart`)
          this.props.createCartItem(plant.id, userId)
        }}>
        Add to Cart
      </button>
    </div>)
}

const mapState = (state) => ({
  plant: state.plant,
  cart: state.cart,
  userId: state.auth.id,
  user: state.auth
});


const mapDispatch = (dispatch) => ({
  createCartItem: (plantId, userId) => dispatch(createCartItem(plantId, userId)),
});

export default connect(mapState, mapDispatch)(AddToCartButton);
