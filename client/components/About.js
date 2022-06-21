import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

export const About = ({ }) => {

  return (
    <div className="about">
      <div className="about-content-container">
        <div className="about-info-container">
          <h1 className="about-title title center">Who We Are</h1>
          <p className="about-text center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi vel, aspernatur, hic sunt atque nobis eligendi est dolor tempore quaerat officiis sapiente esse alias, voluptatibus excepturi inventore voluptatem animi quos. </p>
        </div>
        {/* <img className="about-image" src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg?cs=srgb&dl=pexels-sohail-nachiti-807598.jpg&fm=jpg" alt="plants" /> */}
      </div>



    </div>
  )
};
