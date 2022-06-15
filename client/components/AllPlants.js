import React from "react";
import { connect } from "react-redux";
import { fetchPlants } from "../store/plants";
import { Link } from "react-router-dom";

export class AllPlants extends React.Component {
  componentDidMount() {
    this.props.getPlants();
  }

  render() {
    const { plants } = this.props;
    return (
      <div>
        <h1>Current Available Plants</h1>
        <ul>
          {plants.length === 0 ? (
            <h3>None Available</h3>
          ) : (
            plants.map((plant) => (
              <div key={plant.id}>
                <div>
                  <Link to={`/plants/${plant.id}`}>
                    <h3>{plant.name}</h3>
                  </Link>
                  <p> Description: {plant.description}</p>
                  <p>Price: {plant.price}</p>
                  <p>Location: {plant.location}</p>
                </div>
              </div>
            ))
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
