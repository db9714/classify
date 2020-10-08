const initialState = {
  user_data: {},
  token: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "RESET_USER":
      return { ...initialState };
    case "SET_PROFILE":
      return { ...state, user_data: { ...state.user_data } };
    default:
      return state;
  }
}
