import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { imageDb } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import TextField from "@mui/material/TextField";
import "./createblog.css";
import axios from "axios";
import Navbar from "./Navbar";

function BlogsCreated() {
  const fileInput = useRef();
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [formData, setformData] = useState({
    imageURL: "",
    title: "",
    description: "",
    blogcontent: "",
  });
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  //display the token using the useEffect
  useEffect(() => console.log("Token:", token), [token]);
  useEffect(() => {
    //if token not found navigate to login page
    if (!token) {
      return navigate("/login");
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken("");
    navigate("/allblogs");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (img instanceof File && img.size > 0) {
      const storage = ref(imageDb, `files/${v4()}`);
      await uploadBytes(storage, img);
      const url = await getDownloadURL(storage);

      if (token) {
        try {
          const response = await axios.post(
            "https://bloghereserver.onrender.com/createblog",
            { ...formData, imageURL: url },
            {
              headers: {
                "x-token": token,
              },
            }
          );
          if (response.status === 201) {
            alert("Blog created successfully");
            setformData({ title: "", description: "", blogcontent: "" });
            setImg(null);
            fileInput.current.value = "";
          } else {
            console.error("Error:", response);
            alert("Failed to create blog");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Failed to create blog");
        }
      }
    } else {
      alert("Please select an image file");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="centered-container">
        {/* Add a class for centering */}
        <div className="form-container max-w-4xl mx-auto p-4">
          {/* Add a class for styling the form */}
          <h1 className="text-center text-lg font-semibold mb-4">
            WRITE YOUR BLOG
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-wrap">
            {/* Full width on small screens, half width on medium screens and larger */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-4">
              <input
                className="w-full"
                type="file"
                ref={fileInput}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
            {/* Full width on small screens, full width on medium screens and larger */}
            <div className="w-full px-3 mb-4">
              <TextField
                id="standard-textarea"
                label="TITLE"
                placeholder="Placeholder"
                multiline
                value={formData.title}
                variant="standard"
                onChange={(e) =>
                  setformData({ ...formData, title: e.target.value })
                }
                className="w-full" // Set width to 100% on all screen sizes
              />
            </div>
            {/* Full width on small screens, half width on medium screens and larger */}
            <div className="w-full md:w-1/2 px-3 mb-4">
              <TextField
                id="standard-textarea"
                label="DESCRIPTION"
                placeholder="Description"
                multiline
                value={formData.description}
                variant="standard"
                onChange={(e) =>
                  setformData({ ...formData, description: e.target.value })
                }
                className="w-full" // Set width to 100% on all screen sizes
              />
            </div>
            {/* Full width on all screen sizes */}
            <div className="w-full mb-4">
              <TextField
                id="standard-textarea"
                label="BLOG HERE"
                placeholder="BlogHere"
                multiline
                value={formData.blogcontent}
                variant="standard"
                onChange={(e) =>
                  setformData({ ...formData, blogcontent: e.target.value })
                }
                className="w-full" // Set width to 100% on all screen sizes
              />
            </div>
            {/* Full width on all screen sizes */}
            <div className="w-full text-center">
              <button
                type="submit"
                className="btn btn-outline-success px-4 mr-2"
                variant="contained"
              >
                Post
              </button>
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogsCreated;
