import APIClient from "@holidayextras/jsonapi-client";

export default new APIClient("http://localhost:8080/api/v1", {
  header: {
    authToken: "2ad1d6f7-e1d0-480d-86b2-dfad8af4a5b3",
  },
});
