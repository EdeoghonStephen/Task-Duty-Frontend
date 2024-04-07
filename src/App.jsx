import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MyTask from "./pages/MyTask";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
import Error404 from "./pages/Error404";
import Navbar1 from "./components/Navbar1";
import { Toaster } from "react-hot-toast";

function App() {
  const baseURL = "https://task-duty-backend-smfq.onrender.com";

  return (
    <>
      <Router>
        <Toaster position="top-right" />
        <Navbar1 />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tasks" element={<MyTask baseURL={baseURL} />} />
          <Route path="/new" element={<NewTask baseURL={baseURL} />} />
          <Route path="/edit/:id" element={<EditTask baseURL={baseURL} />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
