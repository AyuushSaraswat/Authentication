import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { NavLink } from "react-router-dom";

const Home = () => {
   
  const auth = useAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    let data = localStorage.getItem("user");
    if (data) {
      data = JSON.parse(data);
      setUser(data);
    }
  }, []);
  return (
    <div className="container">
      <div>
        <h1>Welcome to Home Page </h1>
        <h2>{user.firstName + " " + user.lastName}</h2>
        <button onClick={() => auth.logOut()}>logout</button>
        <br /><br />
      </div>
      <NavLink to="/dashboard">Go to Dashboard </NavLink>
    </div>
    
  );
};

export default Home;
