import React, { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import GlobalStyles from "../../utils/style";
import loadable from "@loadable/component";
import Button from "@mui/material/Button";
import { useBearStore } from "@stores/index";
import shallow from "zustand/shallow";
const LogIn = loadable(() => import("@pages/LogIn"), {
  fallback: <div>로딩중...</div>,
});
const Signup = loadable(() => import("@pages/Signup"));
const Home = loadable(() => import("@pages/Home"));
const Nav = loadable(() => import("@components/navi"));
const SellList = loadable(() => import("@pages/Sell"));

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sell" element={<SellList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
