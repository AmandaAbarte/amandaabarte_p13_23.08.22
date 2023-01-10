import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Edit from "../components/Edit";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const data = useSelector((state) => state.data);
  const isEdit = useSelector((state) => state.isEdit);

  //axios call to get token to authenticate user login
  function getProfile(testToken) {
    axios({
      url: "http://localhost:3001/api/v1/user/profile/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${testToken}`,
      },
    }) // Handle the response from backend here
      .then((res) => {
        dispatch({
          type: "getProfile",
          data: res.data.body,
        });
      })
      // Catch errors if any
      .catch((err) => {
        console.log("error", err);
      });
  }
  //naviagte to login page if no token is detected
  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
    getProfile(token);
  }, []);
  return (
    <main className="main bg-dark">
      <div className="header">
        {isEdit ? (
          <Edit />
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {data.firstName + " " + data.lastName}
            </h1>

            <button
              className="edit-button"
              // on click change isEdit to true - shows input fields allowing user to change their name
              onClick={() => {
                dispatch({
                  type: "isEdit",
                  isEdit: true,
                });
              }}
            >
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}
