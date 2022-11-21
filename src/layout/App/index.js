import React, { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import Button from "@mui/material/Button";
import { useBearStore } from "@stores/index";
import shallow from "zustand/shallow"; //
const LogIn = loadable(() => import("@pages/LogIn"), {
  fallback: <div>로딩중...</div>,
});
const Signup = loadable(() => import("@pages/Signup"));
const App = () => {
  // const [visible, setVisible] = useState(false);

  // const { bears, increasePopulation } = useBearStore(
  //   (state) => ({
  //     bears: state.bears,
  //     increasePopulation: state.increasePopulation,
  //   }),
  //   shallow
  // );
  // console.log(bears);
  return (
    //   <LogIn />
    //   <div>
    //     <Button variant="contained" onClick={increasePopulation}>
    //       Hello World {bears}
    //     </Button>
    //   </div>

    <Routes>
      <Route path="/login" element={<LogIn />} />
      <Route path="/" element={<LogIn />} />
    </Routes>
  );
};

export default App;
