import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

export const Filters = ({ }) => {

  return (<div className="filters-section-container">
    <p className="filters-title">Filters: </p>
    <div className="filters-container">
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>indoor</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>outdoor</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>easy</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>no-fuss</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>moderate</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>under $50</button>
      <button className="btn filters-btn" type="button" onClick={() => console.log("filter")}>under $100</button>
    </div>
  </div>)
};
