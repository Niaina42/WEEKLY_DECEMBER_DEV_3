import React, { useContext, createContext, useEffect, useState } from "react";
import { getAuthToken, removeAuthToken, setAuthToken } from "../token/token";
import https from "../http/https";

const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [isSignUp, setIsSignUp] = React.useState(false);

  useEffect(() => {
    setUser(getAuthToken());
  }, []);

  const signup = (data) => {
    setIsSignUp(true);
    return new Promise(async (resolve, reject) => {
      try { 
        let formData = new FormData()
  
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });
        
        let response = await https.post("/users/add", formData)
        if(response) {
          setAuthToken(response.data)
          setUser(response.data)
          resolve(response.data)
        }
      } catch (error) {
        console.log(error)
        reject(new Error("Error signup"));
      }
    });
  };

  const login = (data) => {
    return new Promise(async (resolve, reject) => {
      try { 
        let formData = new FormData()
  
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });
        
        let response = await https.post("/users/login", formData)
        if(response) {
          setAuthToken(response.data)
          setUser(response.data)
          resolve(response.data)
        }
      } catch (error) {
        console.log(error)
        reject(error)
      }
    });
  };

  const logout = async () => {
    setUser(null);
    removeAuthToken();
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
