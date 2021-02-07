import types from "./types";
import complexApi from "../complexApi";
import store from "../store";
import moment from "moment";

export const fetchOffers = () => async (dispatch) => {
  dispatch({ type: types.IS_FETCHING, payload: true });

  let validityGroup = {};
    console.log(store.getState().offers.startDate)
   if (store.getState().offers.startDate != null) {
        validityGroup["validitystart"] = moment(store.getState().offers.startDate).format('YYYY-MM-DD');
   }

   if (store.getState().offers.endDate != null) {
        validityGroup["validityend"] = moment(store.getState().offers.endDate).format('YYYY-MM-DD');
   }

  return complexApi.find(
    "search_hotels",
    {
      query: store.getState().offers.searchQuery,
      ...validityGroup,
      persons: store.getState().offers.guestCounter,
    },
    (err, resources) => {
      resources = resources || [];
      const payload = resources.map((resource) => resource.toJSONTree());
      dispatch({ type: types.FETCH_OFFERS, payload });
      setTimeout(() => dispatch({ type: types.IS_FETCHING, payload: false }), 1000);
    }
  );
};

export const setSearchQuery = searchQuery => ({ type: types.SET_SEARCH_QUERY, payload: { searchQuery } });
export const setStartDate = startDate => ({ type: types.SET_START_DATE, payload: { startDate } });
export const setEndDate = endDate => ({ type: types.SET_END_DATE, payload: { endDate } });
export const increaseGuestCounter = () => ({ type: types.INCREASE_GUEST_COUNTER });
export const decreaseGuestCounter = () => ({ type: types.DECREASE_GUEST_COUNTER });
export const setGuestCounter = guestCounter => ({ type: types.SET_GUEST_COUNTER, payload: { guestCounter } });
