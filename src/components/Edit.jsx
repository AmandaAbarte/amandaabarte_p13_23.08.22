import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Edit() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

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
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          defaultValue={data.lastName}
        />
        <button
          className="edit-button"
          // on click change isEdit to false - hiding input fields
          onClick={() => {
            dispatch({
              type: "isEdit",
              isEdit: false,
            });
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}
