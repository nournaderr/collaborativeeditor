import React, { useState, useEffect } from "react";

import "react-quill/dist/quill.snow.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Documents from "./Pages/Documents";
import TextEditor from "./Pages/TextEditor";
const App = () => {
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/TextEditor"
            element={<TextEditor value={text} onChange={handleChange} />}
          />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
