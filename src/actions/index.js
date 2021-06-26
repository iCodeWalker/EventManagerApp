import event from "../api/event";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  POST_EVENT,
  GET_EVENTS,
  EVENT_TYPES,
  CLEAR_ERROR_MESSAGE,
  ADD_ERROR,
} from "./types";

export const signIn = ({ email, password }) => {
  return async (dispatch, getState) => {
    try {
      const response = await event.post("/accounts/login/", {
        email: email,
        password: password,
      });
      dispatch({
        type: SIGN_IN,
        payload: response.data.token,
      });
      localStorage.setItem("token", response.data.token);
      history.push("/events");
      console.log(response.data.token);
    } catch (e) {
      dispatch({
        type: ADD_ERROR,
        payload: "Please check your Email and Pasword",
      });
    }
  };
};

export const signUp = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const response = await event.post("/accounts/register/", {
        email: email,
        password: password,
      });
      dispatch({
        type: SIGN_UP,
        payload: response.data,
      });
      console.log(response.data);
      history.push("/login");
    } catch (e) {
      dispatch({
        type: ADD_ERROR,
        payload: "Please Provide valid Email and Password",
      });
    }
  };
};

export const localSignin = () => {
  return async (dispatch) => {
    const token = await localStorage.getItem("token");
    if (token) {
      dispatch({ type: SIGN_IN, payload: token });
      history.push("/events");
    } else {
      history.push("/login");
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await localStorage.removeItem("token");

    dispatch({
      type: SIGN_OUT,
    });
    history.push("/login");
  };
};

export const postEvent = ({ name, event_type, start_date, end_date }) => {
  return async (dispatch, getState) => {
    let token = localStorage.getItem("token");

    try {
      const response = await event.post(
        "/events/",
        {
          name: name,
          event_type,
          start: start_date,
          end: end_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: POST_EVENT,
        payload: response.data,
      });
      history.push("/events");
    } catch (e) {
      dispatch({
        type: ADD_ERROR,
        payload: "All fields are required. Please fill them all.",
      });
    }
  };
};

export const getEvents = () => {
  return async (dispatch, getState) => {
    let token = localStorage.getItem("token");

    try {
      const response = await event.get("/events/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: GET_EVENTS,
        payload: response.data,
      });

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchEventlist = () => {
  return async (dispatch, getState) => {
    let token = localStorage.getItem("token");
    try {
      const response = await event.get("/events/event_types/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: EVENT_TYPES,
        payload: response.data,
      });

      console.log(getState());
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearErrorMessage = () => {
  return async (dispatch) => {
    try {
      const response = "";
      dispatch({
        type: CLEAR_ERROR_MESSAGE,
        payload: response,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
