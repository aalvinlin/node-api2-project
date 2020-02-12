import React from "react";
import MessageBoard from "./components/MessageBoard";
import Controls from "./components/Controls";

import "./App.css";

export default () => (
  <div className="app">
    <MessageBoard />
    <Controls />
  </div>
);
