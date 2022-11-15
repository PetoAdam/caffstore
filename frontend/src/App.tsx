import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

import "./App.css";
import { ResponsiveAppBar } from "./components/responsiveAppBar";
import { signin, signup } from "./constants/pages";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";
import { firebaseConfig } from "./firebase";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Router>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path={`/${signin}`} element={<SignIn />} />
          <Route path={`/${signup}`} element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
