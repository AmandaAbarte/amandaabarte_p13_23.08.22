import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  //update form data on change
  function handleInput(event) {
    const name = event.target.id;
    const value = event.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  //axios call to get token to authenticate user login
  function login(e) {
    e.preventDefault();
    axios({
      url: "http://localhost:3001/api/v1/user/login/",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        //if status = success => update token and navigate to profile page
        if (res.status === 200) {
          dispatch({
            type: "getToken",
            token: res.data.body.token,
          });
          navigate("/profile");
        }
      })
      // Catch errors if any
      .catch((err) => {
        dispatch({
          type: "getError",
          error: err,
        });
        err.toJSON().status === 400
          ? alert("Incorrect login data")
          : alert("server error, something went wrong");
      });
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={login}>
          <div className="input-wrapper">
            <label>Email</label>
            <input type="email" id="email" onChange={handleInput} required />
          </div>
          <div className="input-wrapper">
            <label>Password</label>
            <input
              type="password"
              id="password"
              onChange={handleInput}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label>Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
