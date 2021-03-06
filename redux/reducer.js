import { combineReducers } from 'redux';

const INITIAL_STATE = {
  nargs: [],
  drinks: [],
  foods: []
};

const barReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export default combineReducers({
  bar: barReducer,
});