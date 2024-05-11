import React, { useState } from "react";

import "react-quill/dist/quill.snow.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Documents from "./Pages/Documents";
import TextEditor from "./Pages/TextEditor";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [text, setText] = useState("");
  const handleChange = (value) => {
    setText(value);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/TextEditor"
            element={<TextEditor value={text} onChange={handleChange} />}
          />
          <Route path="/documents" element={<Documents />} />

          {/* <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          /> */}
          {/* <Route
            path="/documents"
            element={isLoggedIn ? <Documents /> : <Navigate to="/" />} // Render Documents only if logged in
          />
          <Route
            path="/TextEditor"
            element={
              isLoggedIn ? (
                <TextEditor />
              ) : (
                <Navigate to="/" value={text} onChange={handleChange} />
              )
            } // Render TextEditor only if logged in 
          />*/}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
