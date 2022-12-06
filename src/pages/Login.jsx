import React from "react";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [token, setToken] = useState("");
  const user = {
    email: "steve@rogers.com",
    password: "password456",
  };
  function getToken(e) {
    e.preventDefault();
    axios({
      // Endpoint to send files
      url: "http://localhost:3001/api/v1/user/login/",
      method: "POST",

      // Attaching the form data
      data: user,
    }) // Handle the response from backend here
      .then((res) => {
        console.log("res", res);
        res.status === 200 && setToken(res.data.body.token);
        getProfile(res.data.body.token);
      })
      .then((res) => {
        console.log(token);
      })
      // Catch errors if any
      .catch((err) => {
        console.log("error", err);
        console.log(err.toJSON());
        err.toJSON().status === 400
          ? console.log("Incorrect login data")
          : console.log("server error, something went wrong");
      });
  }
  function getProfile(testToken) {
    console.log(testToken);
    axios({
      // Endpoint to send files
      url: "http://localhost:3001/api/v1/user/profile/",
      method: "POST",
      headers: {
        // Add any auth token here
        "Content-Type": "application/json",
        Authorization: `Bearer ${testToken}`,
      },
      // // Attaching the form data
    }) // Handle the response from backend here
      .then((res) => {
        console.log("res", res);
        // res.status === 200 && setToken(res.data.body.token);
      })

      // Catch errors if any
      .catch((err) => {
        console.log("error", err);
        // console.log(err.toJSON());
        // err.toJSON().status === 400
        //   ? console.log("Incorrect login data")
        //   : console.log("server error, something went wrong");
      });
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label>Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label>Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label>Remember me</label>
          </div>
          {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
          <a href="/profile" className="sign-in-button">
            Sign In
          </a>
          {/* !-- SHOULD BE THE BUTTON BELOW  */}
          <button className="sign-in-button" onClick={getToken}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
