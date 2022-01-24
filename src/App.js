import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./main.css";

import { Routes, Route, Outlet } from "react-router-dom";

import NavBar from "./components/partials/NavBar";
import AuthenticationForm from "./components/auth/AuthenticationForm";
import StaticMessage from "./components/partials/messages/StaticMessage";
import ListCards from "./components/views/ListCards";
import UpdateCard from "./components/views/UpdateCard";
import AddCard from "./components/views/AddCard";
import Profile from "./components/views/Profile";

const initialSM = {
  open: false,
  message: "",
  severity: "",
  strong: "",
};

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [signin, setSignin] = useState(null);
  const [signup, setSignup] = useState(null);
  const [staticMsg, setStaticMsg] = useState(initialSM);
  // const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    // console.log(loggedUser);
    if (loggedUser) {
      setUser(JSON.parse(loggedUser).user);
      setToken(`Bearer ${JSON.parse(loggedUser).token}`);
    } else {
      setUser(null);
      setToken(null);
    }
  }, []);

  return (
    <div className="App">
      <NavBar
        user={user}
        setSignin={setSignin}
        setSignup={setSignup}
        initialSM={initialSM}
        setStaticMsg={setStaticMsg}
        token={token}
        setUser={setUser}
        setToken={setToken}
      />
      {staticMsg.open && (
        <StaticMessage
          message={staticMsg.message}
          severity={staticMsg.severity}
          setStaticMsg={setStaticMsg}
          strong={staticMsg.strong}
        />
      )}
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
        {!token && (
          <Route
            path="/signin"
            element={
              <AuthenticationForm
                signin={signin || true}
                setSignup={setSignup}
                setSignin={setSignin}
                setStaticMsg={setStaticMsg}
                setToken={setToken}
                setUser={setUser}
              />
            }
          />
        )}
        {!token && (
          <Route
            path="/signup"
            element={
              <AuthenticationForm
                signup={signup || true}
                setSignup={setSignup}
                setStaticMsg={setStaticMsg}
                setToken={setToken}
                setUser={setUser}
              />
            }
          />
        )}
        {token && <Route path="/cards" element={<ListCards token={token} />} />}
        {token && (
          <Route path="/cards/add" element={<AddCard token={token} />} />
        )}
        {token && (
          <Route path="/cards/:cardId" element={<UpdateCard token={token} />} />
        )}
        {token && <Route path="/profile" element={<Profile token={token} />} />}

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        {/* <Route path="/profile" element={<SectionCards user={user} />} /> */}
      </Routes>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>this is About page</h1>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>this is Home page</h1>
      <Outlet />
    </div>
  );
}

export default App;
