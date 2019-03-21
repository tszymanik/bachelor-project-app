import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userLogged: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        userLogged: true,
      };
    default:
      return state;
  }
};

export default reducer;
