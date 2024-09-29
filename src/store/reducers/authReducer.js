import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT,
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILED,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_MOBILE,
  USER_REGISTER_MOBILE_SUCCESS,
  USER_REGISTER_MOBILE_FAILED,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_FAILED,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  CLEAR_ERROR,
} from "../actions";

export const initialState = {
  isUserLogging: false,
  isErrorUserLogging: false,
  error: "",
  isLoggedIn: false,
  access_token: "",
  refresh_token: "",
  loggedInUser: {},
  isGettingUsers: false,
  isErrorGettingUsers: false,
  systemUsers: [],
  isUserRegistering: false,
  isErrorUserRegistering: false,
  isUserRegisteringMobile: false,
  isErrorUserRegisteringMobile: false,
  isGettingUserById: false,
  isErrorGettingUserById: false,
  systemUserById: {},
  isUpdatingUser: false,
  isErrorUpdatingUser: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        error: "",
        isUserLogging: true,
        isErrorUserLogging: false,
      };

    case USER_LOGIN_SUCCESS:
      const { response } = action;
      return {
        ...state,
        isUserLogging: false,
        access_token: response.token,
        refresh_token: response.token,
        loggedInUser: response.user,
        isLoggedIn: true,
      };

    case USER_LOGIN_FAILED:
      const { error } = action;
      return {
        ...state,
        isUserLogging: false,
        isErrorUserLogging: true,
        error: error.errorMsg,
      };

    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        access_token: "",
        refresh_token: "",
        loggedInUser: {},
      };

    case GET_USERS:
      return {
        ...state,
        isGettingUsers: true,
        isErrorGettingUsers: false,
      };

    case GET_USERS_SUCCESS:
      const { resSystemUsers } = action;
      return {
        ...state,
        isGettingUsers: false,
        systemUsers: resSystemUsers,
      };

    case GET_USERS_FAILED:
      return {
        ...state,
        isGettingUsers: false,
        isErrorGettingUsers: true,
      };

    case USER_REGISTER:
      return {
        ...state,
        isUserRegistering: true,
        isErrorUserRegistering: false,
      };

    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        isUserRegistering: false,
      };

    case USER_REGISTER_FAILED:
      return {
        ...state,
        isUserRegistering: false,
        isErrorUserRegistering: true,
      };

    case USER_REGISTER_MOBILE:
      return {
        ...state,
        isUserRegisteringMobile: true,
        isErrorUserRegisteringMobile: false,
      };

    case USER_REGISTER_MOBILE_SUCCESS:
      return {
        ...state,
        isUserRegisteringMobile: false,
      };

    case USER_REGISTER_MOBILE_FAILED:
      return {
        ...state,
        isUserRegisteringMobile: false,
        isErrorUserRegisteringMobile: true,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        isGettingUserById: true,
        isErrorGettingUserById: false,
      };

    case GET_USER_BY_ID_SUCCESS:
      const { resSystemUserById } = action;
      return {
        ...state,
        isGettingUserById: false,
        systemUserById: resSystemUserById,
      };

    case GET_USER_BY_ID_FAILED:
      return {
        ...state,
        isGettingUserById: false,
        isErrorGettingUserById: true,
      };

    case UPDATE_USER:
      return {
        ...state,
        isUpdatingUser: true,
        isErrorUpdatingUser: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdatingUser: false,
      };

    case UPDATE_USER_FAILED:
      return {
        ...state,
        isUpdatingUser: false,
        isErrorUpdatingUser: true,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        isErrorUserLogging: false,
        error: "",
      };

    default:
      return state;
  }
};

export default authReducer;
