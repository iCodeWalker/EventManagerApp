import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";

import Typography from "@material-ui/core/Typography";

import { getEvents, signOut } from "../actions/index";
import EventCalender from "../components/eventcalender";
import Button from "@material-ui/core/Button";

import "./eventlist.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "40ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "block",
  },
}));

const EventList = (props) => {
  const classes = useStyles();
  useEffect(() => {
    props.getEvents();
  }, []);

  const onLogoutClick = () => {
    props.signOut();
  };

  if (props.events === undefined) return <h1>Loading...</h1>;

  const RenderList = () => {
    const data = Array.from(props.events);
    return data.map((d) => {
      var date = `{d.start}`;
      var targetTime = new Date(date);
      var timeZoneFromDB = -5.3;
      var tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset();
      var offsetTime = new Date(
        targetTime.getTime() + tzDifference * 60 * 1000
      );

      return (
        <div key={d.id}>
          <List className={`classes.root `}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={<Typography variant="h4">{d.name}</Typography>}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="div"
                      variant="subtitle1"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {"Event Type :- "}
                      {d.event_type}
                    </Typography>

                    <Typography
                      component="div"
                      variant="subtitle1"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {"Start date :- "} {d.start.slice(0, 10)}
                    </Typography>

                    <Typography
                      component="div"
                      variant="subtitle1"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {"Time (24 Hour):- "} {d.end}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
          <hr></hr>
        </div>
      );
    });
  };

  return (
    <div className="eventlist">
      <div className="eventlist__list">
        <h1>All your events</h1>
        <RenderList />
        <Link to={"/modal"} className="ui button primary eventlist__button">
          ADD EVENT
        </Link>
      </div>
      <div className="eventlist__calender">
        <div
          style={{ marginBottom: 50, position: "absolute", top: 20, right: 20 }}
        >
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={onLogoutClick}
          >
            LOGOUT
          </Button>
        </div>
        <EventCalender />
      </div>

      {/* <Button size="large" variant="contained" color="primary">
        ADD EVENT
      </Button> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    events: state.auth.events,
    errorMessage: state.auth.errorMessage,
  };
};

export default connect(mapStateToProps, { getEvents, signOut })(EventList);
