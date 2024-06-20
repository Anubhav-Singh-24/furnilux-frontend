import { toast } from "react-toastify";
import { API } from "../service/api";


export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
};

export const logoutUser = async()=>{
  try {
    const res = await API.userLogout();
    if (res.isSuccess) {
      toast.success("Logged Out");
      removeTokens();
      return true;
    }
  } catch (error) {
    error.then((err)=>{
      toast.error(err.msg);
    })
  }
}

export const getType = (value, body) => {
  if (value.params) {
    return { params: body };
  } else if (value.query) {
    if (typeof body === "object") {
      return { query: body._id };
    } else {
      return { query: body };
    }
  }
  return {};
};
