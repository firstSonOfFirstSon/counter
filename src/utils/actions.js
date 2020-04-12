import fetch from 'isomorphic-fetch';

const parseResponse = (response) => response.json();
const logError = (error) => console.log(error);
const fetchThenDispatch = (dispatch, url, method) => {
   fetch(url, {method, headers: {'Content-Type': 'application/json'} }).
   then(parseResponse).
   then(dispatch).
   catch(logError)
}

export const update = (value) => (dispatch) => {
   fetchThenDispatch(
      dispatch,
      `/api/counter/${value}`,
      'PUT'
   )
}