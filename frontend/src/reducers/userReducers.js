export const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };

    case "USER_LOGIN_SUCCESS":
      return { loading: false, success: true, userInfo: action?.payload };
    case "USER_LOGIN_FAILED":
      return { loading: false, Error: action.payload };

    case "USER_LOGOUT":
      return {};

    default:
      return state;
  }
};
export const UserReducerRegister = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAILED":
      return { loading: false, Error: action.payload };
    default:
      return state;
  }
};
export const UserDetailsReducer = (
  state = { loading: true, user: {} },
  action
) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_DETAILS_FAILED":
      return { loading: false, Error: action.payload };
    case "USER_DETAILS_RESET":
      return { user: {} };
    default:
      return state;
  }
};
export const UserUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_PROFILE_REQUEST":
      return { loading: true };
    case "USER_UPDATE_PROFILE_SUCCESS":
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case "USER_UPDATE_PROFILE_FAILED":
      return { loading: false, Error: action.payload };
    default:
      return state;
  }
};
export const UserListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "USER_LIST_REQUEST":
      return { ...state, loading: true };
    case "USER_LIST_SUCCESS":
      return { loading: false, users: action?.payload };
    case "USER_LIST_FAILED":
      return { loading: false, Error: action.payload };
    case "USER_LIST_RESET":
      return { users: [] };
    default:
      return state;
  }
};
export const UserDeleteAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DELETE_REQUEST":
      return { loading: true };
    case "USER_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "USER_DELETE_FAILED":
      return { loading: false, Error: action.payload };
    default:
      return state;
  }
};
export const UserUpdateAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return { ...state, loading: true };
    case "USER_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "USER_UPDATE_FAILED":
      return { loading: false, Error: action.payload };
    case "USER_UPDATE_RESET":
      return { user: {} };
    default:
      return state;
  }
};
