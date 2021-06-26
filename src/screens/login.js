import React, { useState } from "react";
import { connect } from "react-redux";
import { signIn, signUp, clearErrorMessage } from "../actions/index";
import "./signUp.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
      width: "50ch",
    },
  },
}));

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const OnChangeEmail = (event) => {
    return setEmail(event.target.value);
  };
  const OnChangePassword = (event) => {
    return setPassword(event.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    props.clearErrorMessage();
    props.signIn({ email, password });
  };

  const onSignupClick = () => {
    props.clearErrorMessage();
    props.history.push("/");
  };

  return (
    <div className="signup-form">
      <h1>Login in here </h1>

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
          LOGIN
        </Button>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onSignupClick}
        >
          SIGNUP
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
    message: state.auth.message,
  };
};

export default connect(mapStateToProps, { signIn, signUp, clearErrorMessage })(
  Login
);
