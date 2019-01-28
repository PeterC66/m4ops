/* eslint-disable import/prefer-default-export */
import { authHeader } from '../_helpers';

// These routines handle the backend server and localStorage

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // eslint-disable-next-line no-restricted-globals
        location.reload(true); // force reload of the page from the server
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(
    `${process.env.VUE_APP_BACKEND_URL}/users/authenticate`,
    requestOptions,
  )
    .then(handleResponse)
    .then((user) => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(
    `${process.env.VUE_APP_BACKEND_URL}/users/register`,
    requestOptions,
  ).then(handleResponse);
}

function getAllUsers() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(
    `${process.env.VUE_APP_BACKEND_URL}/users`,
    requestOptions,
  ).then(handleResponse);
}


function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(
    `${process.env.VUE_APP_BACKEND_URL}/users/${id}`,
    requestOptions,
  ).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(
    `${process.env.VUE_APP_BACKEND_URL}/users/${user.id}`,
    requestOptions,
  ).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
// eslint-disable-next-line no-underscore-dangle
function deleteUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(
    `${process.env.VUE_APP_BACKEND_URL}/users/${id}`,
    requestOptions,
  ).then(handleResponse);
}

export const userService = {
  login,
  logout,
  register,
  getAllUsers,
  getById,
  update,
  deleteUser,
};
