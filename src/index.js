import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Planner from "./Planner";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Planner />
    </DndProvider>
  </React.StrictMode>
);
