import { AnyAction } from "redux";

const initialState = {
  selectedCategory: null,
};

const Categories = (
  state: Record<any, any> = initialState,
  action: AnyAction
): Record<any, any> => {
  switch (action.type) {
    case "CATEGORIES_SET_SELECTED":
      return {
        ...state,
        selectedCategory: action.category,
      };
    default:
      return state;
  }
};

export default Categories;
