import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = props => {
  const { username } = props

  return (
    <div className="home">
      <div className="home-image home-image-container">
        <img className="home-image" src={"https://images.pexels.com/photos/793012/pexels-photo-793012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="potted succulents" />
      </div>

      <h1 className="home-welcome-title">Welcome to <span className="home-seeds">Seeds</span></h1>

      <div className="home-btns">
      <Link to="/plants">
          <button className="home-all-plants">Shop all plants</button></Link>

          <button type="button" className="home-featured-plants">Explore the favorites</button>

      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
