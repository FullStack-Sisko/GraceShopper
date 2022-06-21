import axios from "axios";

const SET_SINGLE_PLANT = "SET_SINGLE_PLANT";


export const setSinglePlant = (plant) => ({
  type: SET_SINGLE_PLANT,
  plant,
});

export const fetchSinglePlant = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/plants/${id}`);
    dispatch(setSinglePlant(data));
  } catch (error) {
    console.error(error);
  }
};


const singlePlantReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SINGLE_PLANT:
      return action.plant;

    default:
      return state;
  }
};

export default singlePlantReducer;
