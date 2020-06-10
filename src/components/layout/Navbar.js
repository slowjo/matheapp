import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

const Navbar = ({ logout, isAuthenticated, user, socket }) => {
  const onLogout = () => {
    logout();
    socket.disconnect();
  };

  const authLinks = (
    <Fragment>
      <li>Hallo {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm">Ausloggen</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      {/* <li>
        <Link to="/register">Register</Link>
      </li> */}
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar">
      <h1>MathsApp</h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  socket: state.auth.socket,
});

export default connect(mapStateToProps, { logout })(Navbar);
