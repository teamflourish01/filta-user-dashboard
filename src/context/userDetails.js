import { createContext, useEffect, useState } from "react";

const userContext = createContext();

export const User = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const url = process.env.REACT_APP_DEV_URL;
  const AuthorizationToken = `Bearer ${token}`;
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  //jwt token save.............
  const storeTokenLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const getUserData = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${url}/user/userdetails`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("context response", data);
        setUserData(data.user);        
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLoginEmail = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${url}/email/gatemailmsg`, {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserDetails(data);      
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (token) {
      getLoginEmail();
      getUserData();
    }

    setTimeout(() => {
      localStorage.removeItem("user");
      window.location.reload();
    }, 2 * 60 * 60 * 1000);
  }, [token]);
  return (
    <userContext.Provider
      value={{
        userData,
        storeTokenLS,
        token,
        getUserData,
        AuthorizationToken,
        userDetails,
        getLoginEmail,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default userContext;
