import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { publicRoute } from "./routes";
function App() {
  return (
    <Routes>
      {publicRoute.map((item, index) => {
        const Page = item.element;
        const path = item.path;
        return <Route key={index} path={path} element={<Page />} />;
      })}
    </Routes>
  );
}

export default App;
