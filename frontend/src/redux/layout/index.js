import types from "./types";

const initialState = {
  isSidebarActive: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.OPEN_SIDEBAR:
      return {
        ...state,
        isSidebarActive: true,
      };
      break;
    case types.CLOSE_SIDEBAR:
      return {
        ...state,
        isSidebarActive: false,
      };
      break;
  }

  return state;
};
