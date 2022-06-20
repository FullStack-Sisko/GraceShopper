import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

export const Filters = ({ }) => {

  return (<div className="section-header">
    <p className="filters-title">Filters </p>
    <div className="filters-container">
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>most popular</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>featured</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>indoor</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>outdoor</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>easy</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>no-fuss</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>moderate</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>under $50</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>under $100</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>small</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>medium</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>large</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>x-large</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>succulents</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>flowers</button>
    </div>
  </div>)
};

const mapState = state => {
  return {
    plants: state.plants
  }
}


export default connect(mapState)(Filters)
