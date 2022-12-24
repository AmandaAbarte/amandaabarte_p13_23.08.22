import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Edit() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const data = useSelector((state) => state.data);
  const [formData, setFormData] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
  });
  function updateName() {
    axios({
      url: "http://localhost:3001/api/v1/user/profile/",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
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

  return (
    <>
      <h1>Edit Your information</h1>
      <div className="edit-container">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          defaultValue={data.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          defaultValue={data.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <p>{formData.firstName}</p>
        <button
          className="edit-button"
          // on click change isEdit to false - hiding input fields
          onClick={() => {
            dispatch({
              type: "isEdit",
              isEdit: false,
            });
            updateName();
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
