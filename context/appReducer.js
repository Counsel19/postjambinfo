import * as ACTIONS from "./actions";

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case ACTIONS.SET_SUCCESS:
      return {
        ...state,
        successMessage: action.payload.successMessage,
      };
    case ACTIONS.SET_USERS:
      return {
        ...state,
        allUsers: action.payload.users,
      };
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };

    case ACTIONS.CLEAR_MESSAGE:
      return {
        ...state,
        successMessage: null,
        errorMessage: null,
      };
    case ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        search: "",
        instituteFilter: "all",
        sort: "latest",
      };
    case ACTIONS.HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: null,
      };

    case ACTIONS.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload.allUsers,
      };

    case ACTIONS.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default appReducer;
