import axios from "axios";

const CREATE_PLANT = "CREATE_PLANT";
const DELETE_PLANT = "DELETE_PLANT";
const SET_PLANTS = "SET_PLANTS";
const UPDATE_PLANT = "UPDATE_PLANT";

export const addPlant = (plant) => ({
  type: CREATE_PLANT,
  plant,
});

export const editPlant = (plant) => ({
  type: UPDATE_PLANT,
  plant,
});

export const removePlant = (plant) => ({
  type: DELETE_PLANT,
  plant,
});

export const setPlants = (plants) => ({
  type: SET_PLANTS,
  plants,
});

export const createPlant = (plant, history) => async (dispatch) => {
  try {
    const { data: created } = await axios.post("/api/plants", plant);
    dispatch(addPlant(created));
    history.push("/plants");
  } catch (error) {
    console.error(error);
  }
};

export const updatePlant = (plant, history) => async (dispatch) => {
  try {
    const { data: updated } = await axios.put(`/api/plants/${plant.id}`, plant);
    dispatch(editPlant(updated));
    history.push("/plants");
  } catch (error) {
    console.error(error);
  }
};

export const deletePlant = (id) => async (dispatch) => {
  try {
    const { data: plant } = await axios.delete(`/api/plants/${id}`);
    dispatch(removePlant(plant));
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlants = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/plants");
    dispatch(setPlants(data));
  } catch (error) {
    console.error(error);
  }
};

const plantsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PLANTS:
      return action.plants;
    case UPDATE_PLANT:
      return state.map((plant) =>
        plant.id === action.plant.id ? action.plant : plant
      );
    case CREATE_PLANT:
      return [...state, action.plant];
    case DELETE_PLANT:
      return state.filter((plant) => plant.id !== action.plant.id);
    default:
      return state;
  }
};

export default plantsReducer;
