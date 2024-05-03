import React from "react";
import calendar from "../../Assets/calendar.svg";
import landing from "../../Assets/airplane-landing.svg";
import takeoff from "../../Assets/airplane-takeoff.svg";
import searchicon from "../../Assets/search-icon.svg";
import { useNavigate } from "react-router-dom";

export default function FlightSearch() {
  const navigate = useNavigate();

  const onSearch = () => {
    navigate('/tickets');
  };

  const fromOptions = [
    "Los Angeles (LAX)",
    "Cairo (CAI)",
    "Berlin (BLN)",
    "Paris (PAR)",
    "New York (JFK)",
  ];

  const toOptions = [
    "Los Angeles (LAX)",
    "Cairo (CAI)",
    "Berlin (BLN)",
    "Paris (PAR)",
    "New York (JFK)",
  ];

  return (
    <div className="flight-search-card">
      <div className="flight-field">
        <div className="field-label">
          <img src={takeoff} className="field-icon" />
          <p>From</p>
        </div>
        <select className="flight-i">
          {fromOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="flight-field">
        <div className="field-label">
          <img src={landing} className="field-icon" />
          <p>To</p>
        </div>
        <select className="flight-i">
          {toOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="flight-field">
        <div className="field-label">
          <img src={calendar} className="field-icon" />
          <p>from Date</p>
        </div>
        <input className="flight-i" type="date" />
      </div>
      <div className="flight-field">
        <div className="field-label">
          <img src={calendar} className="field-icon" />
          <p>to Date</p>
        </div>
        <input className="flight-i" type="date" />
      </div>
      <button className="offers-btn search-btn" onClick={onSearch}>
        <img src={searchicon} className="field-icon" />
        Search
      </button>
    </div>
  );
}
