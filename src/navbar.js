import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedInVar } from "./cache";

import { logoutAction } from "./redux/auth/action";

import { IS_LOGGED_IN_QUERY } from "./graphql/graphqlQuery";

const NavBar = ({ dispatch, status, isLoggedIn }) => {
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    navigate("/login");

    // window.location.reload();
  };

  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isLoggedIn ? (
          <li className="left">
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li onClick={logout} className="left">
            <Link to="">Logout</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

// export default NavBar;

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
    status: state.login.status,
    token: state.login.token,
  };
};

export default connect(
  mapStateToProps,
  null // Generaly its the place of mapStateToDispatch
)(NavBar);
