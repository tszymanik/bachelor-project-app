/* eslint no-unused-vars:0 */

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  isAdmin: false,
  error: null,
  loading: false,
};

const authStart = (state, action) => (
  updateObject(state, {
    error: null,
    loading: true,
  })
);

const authSuccess = (state, action) => (
  updateObject(state, {
    token: action.token,
    userId: action.userId,
    isAdmin: action.isAdmin,
    error: null,
    loading: false,
  })
);

const authFail = (state, action) => (
  updateObject(state, {
    error: action.error,
    loading: false,
  })
);

const authEnd = (state, action) => (
  updateObject(state, {
    token: null,
    userId: null,
  })
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_END:
      return authEnd(state, action);
    default:
      return state;
  }
};

export default reducer;
