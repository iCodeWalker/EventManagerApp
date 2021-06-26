import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";

import Select from "react-select";
import { fetchEventlist, postEvent, clearErrorMessage } from "../actions/index";
import Dropdown from "./dropdown";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./modal.css";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "50ch",
    },
  },
}));
const Modal = (props) => {
  const [name, setName] = useState("");
  const [event_type, setEvent_Type] = useState("");
  const [start_date, setStart_Date] = useState(new Date());
  const [end_date, setEnd_Date] = useState(new Date());
  const classes = useStyles();

  useEffect(() => {
    props.fetchEventlist();
  }, []);

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  let options = props.eventtypes.map((x) => {
    return { label: x, value: x };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(title, startDate, disableHour, selected);
    props.clearErrorMessage();
    props.postEvent({ name, event_type, start_date, end_date });
  };

  const onChange = (value) => {
    setEvent_Type(value.value);
  };

  const OnChangeName = (event) => {
    return setName(event.target.value);
  };
  function styleFn(provided, state) {
    return { ...provided, color: state.isFocused ? "blue" : "red" };
  }

  return (
    <div className="modal">
      <h1>Add event here to memorize</h1>

      <p
        style={{
          color: "red",
          textDecoration: "underline",
          fontWeight: "bold",
          fontSize: 15,
        }}
      >
        {props.errorMessage}
      </p>
      <form onSubmit={onSubmit} className={classes.root}>
        <h3>Name Of Event</h3>
        <TextField
          id="outlined-basic"
          label="Name of The Event"
          variant="outlined"
          type="text"
          value={name}
          onChange={OnChangeName}
        />
        <h3>Select Event Type</h3>

        <Select
          styles={styleFn}
          options={options}
          // errorText={touched && error}
          value={event_type.value}
          onChange={onChange}
          placeholder="Event Types"
        />
        {/* <div>{(touched && error) && 
          <div style={{'fontSize':'12px','color':'rgb(244, 67, 54)'}}>Required</div>}</div> */}

        <h3>Start Date</h3>
        <DatePicker
          selected={start_date}
          onChange={(date) => setStart_Date(date)}
          showTimeSelect
          dateFormat="MM/dd/yyyy h:mm"
          minDate={new Date()}
        />
        <h3>Slots Available</h3>
        <DatePicker
          selected={end_date}
          onChange={(date) => setEnd_Date(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="h:mm aa"

          // filterTime={filterPassedTime}
        />
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          ADD EVENT
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    eventtypes: state.auth.eventtypes,
    errorMessage: state.auth.errorMessage,
  };
};
export default connect(mapStateToProps, {
  fetchEventlist,
  postEvent,
  clearErrorMessage,
})(Modal);
