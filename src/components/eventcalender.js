import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getEvents } from "../actions/index";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./eventcalender.css";

const event_color = [
  {
    event_type: "Bootstrap",
    color: "red",
  },
  {
    event_type: "Family",
    color: "blue",
  },
  {
    event_type: "Charity",
    color: "green",
  },
  {
    event_type: "Charitable auctions",
    color: "pink",
  },
  {
    event_type: "Exhibitions",
    color: "violet",
  },
  {
    event_type: "Corporate",
    color: "yellow",
  },
  {
    event_type: "Fundraising",
    color: "orange",
  },
  {
    event_type: "Holiday",
    color: "purple",
  },
  {
    event_type: "Music events",
    color: "brown",
  },
  {
    event_type: "Networking events",
    color: "gold",
  },
  {
    event_type: "Product launches",
    color: "light red",
  },
  {
    event_type: "Sport events",
    color: "navy",
  },
  {
    event_type: "Sponsored runs",
    color: "maroon",
  },
  {
    event_type: "Trade shows",
    color: "magenta",
  },
];

const EventCalender = (props) => {
  useEffect(() => {
    props.getEvents();
  }, []);

  const [date, setDate] = useState(new Date());

  const onChange = (date, event) => {
    setDate(date);
  };
  console.log("event calender", props.events);

  const result = props.events.map(({ start }) => start);
  console.log("resulted data", result);
  const resultDate = result.map((x) => x.slice(0, 10));
  console.log("result date", resultDate);

  const eventType = props.events.map(({ event_type }) => event_type);
  console.log(event_color ? event_color.map((x) => x.event_type) : null);

  // const mark = ["17-06-2021", "20-06-2021", "05-06-2021"];
  console.log(event_color ? event_color.map((x) => x.color) : null);

  console.log(event_color[0].event_type);
  return (
    <div>
      <Calender
        onChange={onChange}
        value={date}
        selectRange
        showNeighboringMonth={false}
        tileDisabled={({ activeStartDate, date, view }) =>
          date < new Date(Date.now() - 86400000)
        }
        // tileContent={({ date, view }) => {
        //   if (eventsdate.find((x) => x === moment(date).format())) {
        //     return <p>Hii</p>;
        //   }
        // }}
        tileClassName={({ date, view }) => {
          if (resultDate.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return "highlight";
          }
        }}
        // tileContent={({ date, view }) =>
        //   view === "month" && date.getDay() === 0 ? <p>Sunday</p> : null
        // }
      />
      {/* {date.toString()} */}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    events: state.auth.events,
  };
};

export default connect(mapStateToProps, { getEvents })(EventCalender);
