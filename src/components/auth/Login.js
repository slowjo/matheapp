import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/authActions";
import PropTypes from "prop-types";
import Navbar from "../layout/Navbar";

const Login = ({ login, isAuthenticated, error, history, clearErrors }) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      alert(error);
      clearErrors();
    }
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const { name, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || password === "") {
      alert("Please fill in all fields");
    } else {
      login({
        name,
        password,
      });
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className="form-container">
        <h2 className="text-center">Melde dich an</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <input type="submit" value="Anmelden" className="btn btn-block" />
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { login, clearErrors })(Login);
