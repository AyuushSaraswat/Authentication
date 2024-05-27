import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
  const [data, Setdata] = useState({
    
    username: "",   
    password: "",

  });

  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (data.username !== "" && data.password !== "") {
      auth.loginAction(data);
      return;
    }
    alert("Not a valid user");
  };

  const handledata = (e) => {
    const { name, value } = e.target;
    Setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitEvent}>

      <div className="form_control">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handledata}
        />
      </div>

      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handledata}
        />
      </div>

      <button type="submit" className="btn-submit">Login</button>
    </form>
  );
};

export default Login;