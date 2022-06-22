import React from "react";
import { connect } from "react-redux";
import { fetchPlants } from "../store/plants";
import { Link } from "react-router-dom";
// import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { Filters } from './Filters'
import { createCartItem, createLaterCartItem } from "../store/cart_item"

export class AllPlants extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getPlants();
  }

  render() {
    const { plants } = this.props;
    const userId = this.props.userId
    return (
      <div>
        <h1 className="all-plants-title center title">All Plants</h1>
        <Filters />
        <ul>
          {plants.length === 0 ? (
            <h3>None Available</h3>
          ) : (
            <div className="all-plants-container" >
              {plants.map((plant) => (
                <div key={plant.id}>

                  <div className="all-plants-single-plant-container">

                    <div className="all-plants-image-container">
                      <Link to={`/plants/${plant.id}`}>
                        <img className="all-plants-image" src={plant.imgUrl} alt={plant.name} />
                      </Link>
                    </div>

                    <div className="all-plants-info">
                      <h3 className="all-plants-name">{plant.name}</h3>

                      <div className="all-plants-location-care-container">
                        <span className="all-plants-location center">{plant.location}</span>
                        <span>|</span>
                        <span className="all-plants-care center">{plant.care}</span>
                      </div>
                      <p className="all-plants-description"> {plant.description}</p>


                      <div className="all-plants-price-cart-container">
                        <p className="all-plants-price">${plant.price}</p>
                        <p>{null}</p>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
          }

        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    plants: state.plants,
    userId: state.auth.id
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getPlants: () => dispatch(fetchPlants()),
    createLaterCartItem: (plantId, userId) => dispatch(createLaterCartItem((plantId, userId, history))),
    createCartItem: (plantId, userId) => dispatch(createCartItem((plantId, userId, history)))
  }
};

export default connect(mapState, mapDispatch)(AllPlants);
