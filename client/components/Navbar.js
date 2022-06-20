import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { GiPlantRoots } from "react-icons/gi"

const Navbar = ({ handleClick, isLoggedIn, userId, username }) => {


  return (
    <div>
      <nav >
        {isLoggedIn ? (
          <div className="navbar">
            <div className="nav-left">
              {/* The navbar will show these links after you log in */}
              <div className="nav-logo">
                <Link to="/home"><GiPlantRoots /> Grace's Greens</Link>
              </div>
              <div className="nav-left-links">

                <Link to="/plants">Plants</Link>
                <Link to={`/cart/${userId}`}>Your Cart</Link>
                <Link to={`/about`}>Who We Are</Link>
              </div>
            </div>
            <div className="nav-right">
              <span className="nav-welcome">Welcome, {username}</span>
              <div className="nav-logout">
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/plants">Plants</Link>
          </div>
        )}
      </nav>
    </div>
  )
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    username: state.auth.username
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
