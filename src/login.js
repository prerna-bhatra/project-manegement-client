/* eslint-disable*/

import React, { useState } from "react";
import { connect } from "react-redux";
import { FormControl, InputLabel, Input } from "@material-ui/core";

import { loginSuccess } from "./redux/auth/action";
import { LOGIN_USER } from "./graphql/graphqlQuery";
import { isLoggedInVar, idVar, emailVar, nameVar } from "./cache";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Login = ({ dispatch, status, token }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [submitLogin, { loading, error }] = useMutation(LOGIN_USER);

  const handleChange = (value, field) => {
    const temp = user;
    temp[field] = value;
    setUser({ ...temp });
  };

  const cancelLogin = () => {
    const temp = user;
    temp["email"] = "";
    temp["password"] = "";

    setUser({ ...temp });
  };

  return (
    <div>
      <h3>Login</h3>
      <div>
        <FormControl>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            onChange={(e) => handleChange(e.target.value, "email")}
            id="email"
            value={user.email}
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            onChange={(e) => handleChange(e.target.value, "password")}
            id="password"
            value={user.password}
          />
        </FormControl>
      </div>
      <div>
        <button
          onClick={() =>
            submitLogin({
              variables: {
                email: user.email,
                password: user.password,
              },
              onCompleted: (data) => {
                localStorage.setItem("token", data?.login?.token);
                const { name, email, id } = data?.login?.data;
                localStorage.setItem("id", id);
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);

                if (data) {
                  dispatch(
                    loginSuccess({
                      payload: data.login,
                    })
                  );
                }

                // isLoggedInVar(true);
                // idVar(id);
                // emailVar(email);
                // nameVar(name);

                navigate("/");
              },
            })
          }
          // type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    status: state.login.status,
    token: state.login.token,
  };
};

export default connect(
  mapStateToProps,
  null // Generaly its the place of mapStateToDispatch
)(Login);
