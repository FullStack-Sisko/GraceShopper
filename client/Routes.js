import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllPlants from "./components/AllPlants";
import SinglePlant from "./components/SinglePlant";
import Cart from "./components/Cart";
import AdminHome from "./components/AdminHome";
import Create from "./components/Create";
import { About } from "./components/About";
import Checkout from "./components/Checkout";
import PageNotFound from "./components/NotFound";
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route
              exact={true}
              path="/plants/:plantId"
              component={SinglePlant}
            />
            <Route path="/plants" component={AllPlants} />
            <Route path="/admin/create" component={Create} />
            <Route path="/admin" component={AdminHome} />
            <Route path="/cart/:userId" component={Cart} />
            <Route path="/about" component={About} />
            <Route path="/checkout/:userId" component={Checkout} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/plants/:plantId" component={SinglePlant} />
            <Route path="/plants" component={AllPlants} />
            <Route path="/cart/:userId" component={Cart} />
            <Route path="/about" component={About} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
