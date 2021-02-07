import types from "./types";

export const openSidebar = () => async (dispatch) => {
  dispatch({ type: types.OPEN_SIDEBAR, payload: {} });
};

export const closeSidebar = () => async (dispatch) => {
    dispatch({ type: types.CLOSE_SIDEBAR, payload: {} });
  };