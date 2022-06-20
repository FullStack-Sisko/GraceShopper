import React from "react";
import { connect } from "react-redux";
import { fetchPlants } from "../store/plants";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa'
import { Filters } from './Filters'

export class AllPlants extends React.Component {
  componentDidMount() {
    this.props.getPlants();
  }

  render() {
    const { plants } = this.props;
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

                      <div className="all-plants-info-bottom-container">
                        <div>
                          <button type="submit" title="Save for Later" className="all-plants-save-btn btn save-to-favorites-hover"
                          >{<FaRegHeart />}</button>
                        </div>
                        <div className="all-plants-price-cart-container">
                          <p className="all-plants-price">${plant.price}</p>
                          <button type="submit" title="Add To Cart" className="all-plants-add-btn btn add-to-cart-hover"
                          >{<FaShoppingCart />}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    plants: state.plants,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getPlants: () => dispatch(fetchPlants()),
  };
};

export default connect(mapState, mapDispatch)(AllPlants);
