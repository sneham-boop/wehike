import React from "react";
import Profile from "./components/Profile";
import FindRun from "./components/FindRun";
import RegisterUser from "./components/RegisterUser";
import Homepage from "./components/Homepage.jsx";
import SignIn from "./components/SignIn";
import RegisterRun from "./components/RegisterRun";
import App from "./App";

import {
  createRoutesFromElements,
  createHashRouter,
  Route,
} from "react-router-dom";
import ShowRunInfo from "./components/ShowRunInfo";
import FAQs from "./components/FAQs";

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Homepage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/hike" element={<FindRun />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/create" element={<RegisterRun />}/>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/run-info" element={<ShowRunInfo />} />
      <Route path="/faq" element={<FAQs />} />
    </Route>
  )
);
