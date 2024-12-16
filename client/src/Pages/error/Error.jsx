import React from "react";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import { Link } from "react-router-dom";
import "./error.css";

const Error = () => {
  const now = new Date();

  // Extract date and time components
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Months are 0-indexed
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Convert to 12-hour format
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return (
    <div className="cancel-wrapper">
      <div className="cancel">
        <p className="icon">
          <CreditCardOffIcon sx={{ fontSize: "40px" }} />
        </p>
        <h2>Payment Failed!</h2>
        <p className="email-msg">
          Hey, seems like there was some trouble. <br /> We are there with you,
          Just hold back.
        </p>
        <p className="description">
          {` ${date}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`}
        </p>
        <Link to="/cart">
          <button type="button" width="300px" className="cancel-btn">
            try again
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
