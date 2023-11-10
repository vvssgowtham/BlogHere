import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Logins from "./components/Logins";
import SignUp from "./components/Signup";
import MyBlogs from "./components/MyBlogs";

//using useState for storing token in the variable and ContextAPI
export const store = createContext();

function App() {
  const [token, setToken] = useState(null); //by default value of token is null endhukantey by default first loney user login ayyi undadu kadhaa so andhukey null pettanu

  return (
    //with store provider property we will be able to send (token) to each and every component using useContext
    <store.Provider value={[token,setToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Logins />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myblogs" element={<MyBlogs />} />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
}

export default App;
