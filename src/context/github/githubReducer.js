import {
  GET_USER,
  SEARCH_USERS,
  CLEAR_USERS,
  GET_REPOS,
  SET_LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    //Set the Loading to true
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    //Search users
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    //CLear Users
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };

    //Get User
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };

    //Get Repos
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };

    default:
      return state;
  }
};
