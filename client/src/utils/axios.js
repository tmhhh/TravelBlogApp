import axios from "axios";

export const sendRequest = (url, method, data) => {
  if (method === "GET")
    return axios({
      method,
      url,
    });
  else
    return axios({
      method,
      url,
      data: data,
    });
  //   return res;
  // } catch (error) {
  //   console.log("error in utils");

  //   return error;
  // }
};
