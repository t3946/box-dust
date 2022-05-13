import { AnyAction } from "redux";

const initialState = {};

const Catalog = (
  state: Record<any, any> = initialState,
  action: AnyAction
): Record<any, any> => {
  switch (action.type) {
    default:
      return state;
  }
};

export default Catalog;
