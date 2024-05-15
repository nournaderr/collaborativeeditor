import Lottie from "lottie-react";
import ap from "../lotties/Animation - 1714335733825.json";
import "../styles/Login.css";
import { useState } from "react";
import Login from "../Pages/Login";
export default function LoginCard({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://collabbackend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      // localStorage.setItem("isLoggedIn", true);
      // console.log("ana hena");
      window.location.href =
        "/Documents?username=" + encodeURIComponent(username);
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
    <div className="login-card">
      <div className="title">
        <div className="lottie">
          <Lottie loop={true} animationData={ap} style={{ height: 100 }} />
        </div>
        <h2>
          YOUR FAVOURITE <br></br>
          <span className="airline">TEXTEDITOR</span>
        </h2>
      </div>
      <div className="login-form">
        <div className="wb">
          Write together, anywhere, anytime
          <br />
          <span className="wb-t">
            {" "}
            Collaborate seamlessly with our text editor!
          </span>
        </div>
        <form>
          <label>Username:</label>
          <input
            name="username"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <input
            name="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <a className="forgot" href="">
            forgot password?
          </a> */}
          <div id="error-message"></div>
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <a className="forgot center" href="/register">
            CREATE ACCOUNT?
          </a>
        </form>
      </div>
    </div>
  );
}
