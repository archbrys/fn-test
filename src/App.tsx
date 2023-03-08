import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Students from "./modules/Students";
import Profile from "./modules/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
