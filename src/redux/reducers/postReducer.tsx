import { Reducer } from "react";

const initialState = {
  orders: [],
  errorMessage: "",
  shouldDisplayErrorMessage: false,
};

const postsReducer: Reducer<any, any> = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL_ORDERS_REQUEST":
      return {}; // to decide what to do in each action
    default:
      return state;
  }
};

export default postsReducer;
