import axios from "axios";

const SET_SINGLE_PLANT = "SET_SINGLE_PLANT";
// const ADD_PLANT_CART_ITEM = "ADD_PLANT_CART_ITEMS";
// const DELETE_PLANT_CART_ITEM = "DELETE_PLANT_CART_ITEM";

export const setSinglePlant = (plant) => ({
  type: SET_SINGLE_PLANT,
  plant,
});

// export const removePlantCartItem = (cartItem) => ({
//   type: DELETE_PLANT_CART_ITEM,
//   cartItem,
// });

// export const addPlantCartItem = (cartItem) => ({
//   type: ADD_PLANT_CART_ITEM,
//   cartItem,
// });

export const fetchSinglePlant = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/plants/${id}`);
    dispatch(setSinglePlant(data));
  } catch (error) {
    console.error(error);
  }
};

// export const deletePlantCartItem = (plantId, cartItemId) = async (dispatch) => {
//     try {
//         const { data: cartItem } = await axios.delete(`/api/plants/${plantId}/cartItem/${cartItemId}`);
//         dispatch(removePlantCartItem(cartItem));
//     } catch (error) {
//         console.error(error);
//     }
// }

// export const setPlantCartItem = (id) => async (dispatch) => {
//   try {
//     const { data } = await axios.get(`/api/plants/${id}/cart_items`);
//     dispatch(addPlantCartItem(data));
//   } catch (error) {
//     console.error(error);
//   }
// };

const initialState = { info: {}, cartItems: [] };

const singlePlantReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PLANT:
      return { ...state, info: action.plant };
    // case DELETE_PLANT_CART_ITEM:
    //   const filtered = state.cartItems.filter(
    //     (cartItem) => cartItem.id !== action.cartItem.id
    //   );
    //   return { ...state, cartItems: filtered };
    // case ADD_PLANT_CART_ITEM:
    //   return { ...state, cartItems: action.cartItem };
    default:
      return state;
  }
};

export default singlePlantReducer;
