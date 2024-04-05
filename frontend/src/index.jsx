import React from "react";
import ReactDOM from "react-dom";
import App from "./brandtitle/App";
import Logo from "./brandlogo/logobrand";
import Adduser from "./user/Adduser/Adduser";
import FetchUser from "./user/Fetchuser/fetchuser";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Logo />
    <Adduser />
    <FetchUser />
  </React.StrictMode>,
  document.getElementById("root"),
);
