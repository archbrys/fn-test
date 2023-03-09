import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Students from "./modules/Students";
import Profile from "./modules/Profile";
import styled from "@emotion/styled";

const Header = styled.div`
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
