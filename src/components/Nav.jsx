import React from "react";
import { useSelector } from "react-redux";
import BankLogo from "../img/argentBankLogo.png";

export default function Nav() {
  const token = useSelector((state) => state.token);
  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img
          className="main-nav-logo-image"
          src={BankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div>
        <a className="main-nav-item" href="/login">
          <i className="fa fa-user-circle"></i>
          {token !== "" ? "Log out" : "Sign in"}
        </a>
      </div>
    </nav>
  );
}
