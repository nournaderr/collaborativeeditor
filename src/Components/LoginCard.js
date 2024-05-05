import axios from "axios";
import Lottie from "lottie-react";
import ap from "../lotties/Animation - 1714335733825.json";
import "../styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const newUser = {
    username: username,
    password: password,
  };
  const handleLogin = async () => {
    try {
      const response = await fetch("https://collabbackend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Username already exists!");
      }
      console.log("User created successfully");
    } catch (error) {
      console.error(error);
      setUsernameError("Username already exists");
      return;
    }
  };
  //     try {
  //       const response = await axios.post(
  //         "https://collabbackend.onrender.com/login",
  //         {
  //           username: username,
  //           password: password,
  //         }
  //       );
  //       console.log(response.data); // Handle successful login
  //       if (response.data === "T") {
  //         navigate("/TextEditor"); // Navigate to documents page upon successful login
  //       } else {
  //         // Handle unexpected response from server
  //         console.error("Error:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Login failed:", error); // Handle login error
  //     }
  //   };

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
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <a className="forgot center" href="/register">
            CREATE ACCOUNT!
          </a>
        </form>
      </div>
    </div>
  );
}
