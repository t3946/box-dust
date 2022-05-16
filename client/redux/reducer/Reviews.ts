import { AnyAction } from "redux";

const initialState = { list: [], skip: 1 };

const Reviews = (
  state: Record<any, any> = initialState,
  action: AnyAction
): Record<any, any> => {
  switch (action.type) {
    case "REVIEWS_ADD":
      const newState = { ...state };

      newState.list = [...newState.list, ...action.data.reviews];

      return newState;

    default:
      return state;
  }
};

export default Reviews;
