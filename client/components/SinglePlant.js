import React from "react";
import { Link } from "react-router-dom";
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
  }

  componentDidMount() {
    try {
      const plantId = this.props.match.params.plantId;
      this.props.loadSinglePlant(plantId);
    } catch (err) {
      console.error(err);
    }
  }

  componentDidUpdate(prevProps) {
    try {
      const plantId = this.props.match.params.plantId;
      if (plantId !== prevProps.match.params.plantId) {
        this.props.loadSinglePlant(plantId);
      }
    } catch (error) { console.error(error) }
  }

  render() {
    const plant = this.props.plant;
    const userId = this.props.userId

    return (<div>
      <div className="single-plant-page">

        <div className="single-plant-image-container">
          <img className="single-plant-image" src={plant.imgUrl} alt={plant.name} />
        </div>

        {/* single plant info and details */}
        <div className="single-plant-info-container">
          <h1>{plant.name}</h1>
          <p className="single-plant-description">{plant.description}</p>
          <p>${plant.price}</p>
          <p>{plant.location}</p>
          <p>{plant.care}</p>
          <p>Stock: {plant.inventory ? <span>item in stock</span> : <span>item out of stock</span>}</p>


          {plant.inventory === 0 ? null : (
            <button className="btn"
              type="submit"
              onClick={() => {

                this.props.createCartItem(plant.id, userId)
              }}>
              Add to Cart
            </button>)}
        </div>
      </div>


      {/* next and previous buttons, hard coded checks against quantity of plants */}
      <div className="change-page-container">

        {plant.id > 1 ? (
          <Link to={`/plants/${plant.id - 1}`}>previous</Link>) : <span></span>}

        {plant.id >= 28 ? (<span></span>) : (
          <Link to={`/plants/${plant.id + 1}`}>next</Link>)}

      </div>
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
});

export default connect(mapState, mapDispatch)(SinglePlant);
