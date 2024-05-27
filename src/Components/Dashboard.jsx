import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
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
        <h1>Welcome to Dashboard Page </h1>
        <h2>
          {user?.firstName} {user?.lastName}
        </h2>
        <button onClick={() => auth.logOut()}>logout</button>
        <br />
        <br />
        <NavLink to="/home">Go to Home Page</NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
