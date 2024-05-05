import axios from "axios";
import "../styles/Login.css";
import LoginCard from "../Components/LoginCard";
export default function Login() {
  const handleSubmit = async (username, password) => {
    try {
      const response = await axios.post(
        "https://collabbackend.onrender.com/login",
        {
          username: username,
          password: password,
        }
      );
      console.log(response.data); // Handle successful login
    } catch (error) {
      console.error("Login failed:", error); // Handle login error
    }
  };
  return (
    <div className="login">
      <LoginCard onSubmit={handleSubmit} />
    </div>
  );
}
