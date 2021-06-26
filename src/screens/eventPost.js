import React, { useState } from "react";
import { connect } from "react-redux";
import { postEvent } from "../actions/index";

const EventPost = ({ postEvent, getEvents }) => {
  const [name, setName] = useState("");
  const [event_type, setEvent_Type] = useState("");
  const [start_date, setStart_Date] = useState("");
  const [end_date, setEnd_Date] = useState("");

  const OnChangeName = (e) => {
    return setName(e.target.value);
  };

  const OnChangeEvent_Type = (e) => {
    return setEvent_Type(e.target.value);
  };
  const OnChangeStart_Date = (e) => {
    return setStart_Date(e.target.value);
  };
  const OnChangeEnd_Date = (e) => {
    return setEnd_Date(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    postEvent({ name, event_type, start_date, end_date });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={name} onChange={OnChangeName} />
        <input type="text" value={event_type} onChange={OnChangeEvent_Type} />
        <input type="text" value={start_date} onChange={OnChangeStart_Date} />
        <input type="text" value={end_date} onChange={OnChangeEnd_Date} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth,
  };
};

export default connect(mapStateToProps, { postEvent })(EventPost);
