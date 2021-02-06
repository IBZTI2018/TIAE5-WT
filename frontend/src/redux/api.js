import JSONAPIClient from "@holidayextras/jsonapi-client";
import store from './store';
import { getAuthToken } from './auth/selectors';

export default new JSONAPIClient(`${window.location.origin}/api/v1`, {
  header: {
    'Authorization': `Bearer ${getAuthToken(store.getState())}`
  }
});
