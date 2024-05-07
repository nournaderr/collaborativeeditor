import axios from "axios";
import "../styles/Register.css";
import Lottie from "lottie-react";
import ap from "../lotties/Animation - 1714335733825.json";
import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function RegisterCard() {
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  // const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      displayErrorMessage("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        "https://collabbackend.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );

      if (!response.ok) {
        throw new Error("Username already used");
      }

      window.location.href = "/";
    } catch (error) {
      console.log("error");
      displayErrorMessage(error.message);
      console.error(error);
      return;
    }
  };
  const displayErrorMessage = (message) => {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
  };
  return (
    <div className="register-card">
      <div className="title">
        <div className="lottie">
          <Lottie loop={true} animationData={ap} style={{ height: 100 }} />
        </div>
        <h2>
          YOUR FAVOURITE <br></br>
          <span className="airline">TEXTEDITOR</span>
        </h2>
      </div>
      <div className="register-form">
        <div className="h">
          Hello,
          <br />
          <span className="ca">Create Account</span>
        </div>

        <form>
          <div className="scrollable-container">
            <label>Username:</label>
            <input name="Username" placeholder="Nour" className="reg-inputs" />
            {/* <label>Email:</label>
            <input
              name="email"
              placeholder="nournader@gmail.com"
              className="reg-inputs"
            /> */}
            <label>Password:</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*******"
              className="reg-inputs"
            />
            <label>Re-enter Password:</label>
            <input
              name="Re Password"
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              placeholder="*******"
              className="reg-inputs"
            />
            {/* <label>Phone number:</label>
            <input
              name="phone number"
              placeholder="01113282737"
              className="reg-inputs"
            /> */}
            <div id="error-message"></div>
            <div className="center">
              <button className="login-btn" onClick={handleRegister}>
                Create Account
              </button>
            </div>
            <div className="sign">
              <a className="have-acc" href="">
                I have an Account
              </a>
              <a className="sign-in" href="/">
                {" "}
                SIGN IN
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
