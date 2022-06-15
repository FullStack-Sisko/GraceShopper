import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import plantsReducer from "./plants";
import singlePlantReducer from "./singlePlant";
import cartItemsReducer from "./cart_item";

const reducer = combineReducers({
  auth,
  plants: plantsReducer,
  plant: singlePlantReducer,
  cart: cartItemsReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
