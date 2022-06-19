import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

export const Footer = ({ }) => {


  return (
    <div className="footer">
      <p>Grace Shopper</p>
      <p>|</p>
      <p>2022</p>

    </div>
  )
};
