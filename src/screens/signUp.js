import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  signIn,
  signUp,
  clearErrorMessage,
  localSignin,
} from "../actions/index";
import "./signUp.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "50ch",
    },
  },
}));

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();
  useEffect(() => {
    props.localSignin();
  });

  const OnChangeEmail = (event) => {
    return setEmail(event.target.value);
  };
  const OnChangePassword = (event) => {
    return setPassword(event.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    props.clearErrorMessage();
    props.signUp({ email, password });
  };

  const onLoginClick = () => {
    props.clearErrorMessage();
    props.history.push("/login");
  };
  return (
    <div className="signup-form">
      <h1>Register Your Account here</h1>
      <form
        onSubmit={onSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
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
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={OnChangeEmail}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={OnChangePassword}
        />
        {/* <TextField type="submit" value="Submit" variant="standard" /> */}
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          SIGNUP
        </Button>

        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onLoginClick}
        >
          LOGIN
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth,
    events: state.auth.events,
    errorMessage: state.auth.errorMessage,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signUp,
  clearErrorMessage,
  localSignin,
})(SignUp);
