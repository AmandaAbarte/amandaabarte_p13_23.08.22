import React from "react";
import { useSelector } from "react-redux";

export default function Edit() {
  const data = useSelector((state) => state.data);
  return (
    <>
      <h1>Edit</h1>
      <div className="edit-container">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={data.firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={data.LastName}
        />
      </div>
    </>
  );
}
