import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, userId, username }) => {


  return (
    <div>
      <nav >
        {isLoggedIn ? (
          <div className="navbar">
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Grace's Plants</Link>
              <Link to="/home">Home</Link>
              <Link to="/plants">Plants</Link>
              <Link to={`/cart/${userId}`}>Cart</Link>
            </div>
            <div>
              <span>Welcome, {username}</span>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
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
      <hr />
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
