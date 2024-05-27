import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
    
const AuthContext = createContext();  

const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => { 
    try {
      const response = await fetch("https://dummyjson.com/auth/login",
       {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) { 
        if (responseData && responseData.message) {
          alert("Please provide a valid input");
          throw new Error(`Authentication failed: ${responseData.message}`);
        } else {
          throw new Error(
            "Failed to authenticate: No response from server"
          );
        }
      }

      if (!responseData.token) {
        throw new Error("Failed to authenticate: No token received");
      }
      
      console.log(responseData)

      setToken(responseData.token);

      localStorage.setItem("user", JSON.stringify({
        id: responseData.id,
        username: responseData.username,
        email: responseData.email,
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        gender: responseData.gender,
        image: responseData.image,
      }));

      localStorage.setItem("site", responseData.token);
      navigate("/dashboard");
    } 
    catch (error) {
      console.error(error); 
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
