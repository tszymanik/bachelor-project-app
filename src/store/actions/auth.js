import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => (
  {
    type: actionTypes.AUTH_START,
  }
);

export const authSuccess = (token, userId, isAdmin) => (
  {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
    isAdmin,
  }
);

export const authFail = error => (
  {
    type: actionTypes.AUTH_FAIL,
    error,
  }
);

export const authEnd = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');

  return {
    type: actionTypes.AUTH_END,
  };
};

export const checkAuthTimeout = expirationTime => dispatch => (
  setTimeout(() => {
    dispatch(authEnd());
  }, expirationTime * 1000)
);

export const auth = (email, password) => async (dispatch) => {
  dispatch(authStart());

  const authData = {
    email,
    password,
  };

  try {
    const authResponse = await axios.post('http://localhost:4000/auth', authData);
    const { userId } = authResponse.data;
    const { token } = authResponse.data;
    const { expiresIn } = authResponse.data;

    const userResponse = await axios.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = userResponse.data;
    const { typesOfUserId } = userData;

    const typesOfUserName = [];

    await Promise.all(typesOfUserId.map(async (typeOfUserId) => {
      const typeOfUserResponse = await axios.get(`/types-of-user/${typeOfUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const typeOfUserData = typeOfUserResponse.data;
      typesOfUserName.push(typeOfUserData.name);
    }));

    const isAdmin = typesOfUserName.includes('administrator');

    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));

    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(token, userId, isAdmin));
    dispatch(checkAuthTimeout(expiresIn));
  } catch (error) {
    dispatch(authFail(error.response.data.error));
  }
};

export const checkAuthState = () => async (dispatch) => {
  const token = localStorage.getItem('token');

  if (!token) {
    dispatch(authEnd());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (expirationDate <= new Date()) {
      dispatch(authEnd());
    } else {
      const userId = localStorage.getItem('userId');


      const userResponse = await axios.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = userResponse.data;
      const { typesOfUserId } = userData;

      const typesOfUserData = [];

      await Promise.all(typesOfUserId.map(async (typeOfUserId) => {
        const typeOfUserResponse = await axios.get(`/types-of-user/${typeOfUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const typeOfUserData = typeOfUserResponse.data;
        typesOfUserData.push(typeOfUserData);
      }));

      const isAdmin = typesOfUserData.some(typeOfUserData => typeOfUserData.name === 'administrator');

      dispatch(authSuccess(token, userId, isAdmin));
      dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
};
