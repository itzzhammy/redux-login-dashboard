import React, { useState } from "react";
import SignIn from "../components/atomicComponents/SignIn";
import Error from "../components/atomicComponents/Error";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userSlice";
import { useNavigate } from "react-router-dom";
const LoginView = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(null);
  const [isLoading, setLoading] = useState(null);

  const submitForm = async (value) => {
    const { email, password } = value;
    const req = { email: email, password: password };

    try {
      setLoading(true);
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const data = await response.json();

      if (response.ok && data.token) {
        dispatch(
          login({
            ...value,
            data: data.token,
            isLoggedin: true,
            error: null,
          })
        );
        localStorage.setItem('token',data.token)
        navigate("/dashboard");
      }

      if (!response.ok || data.error) {
        throw new Error("User not found");
      }
      setLoading(false);

      return data;
    } catch (err) {
      setLoading(true);
      dispatch(
        login({
          ...value,
          error: err.message,
          isLoggedin: false,
          data: null,
        })
      );
      setLoginError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <SignIn
        getData={submitForm}
        loginError={loginError}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LoginView;
