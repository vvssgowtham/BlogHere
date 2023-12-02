import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { imageDb } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./createblog.css";
import axios from "axios";
import { store } from "../App";

function BlogsCreated() {
  const fileInput = useRef();
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  const [img, setImg] = useState("");
  const [formData, setformData] = useState({
    imageURL: "",
    title: "",
    description: "",
    blogcontent: "",
  });

  const storedToken = localStorage.getItem("token");
  setToken(storedToken || "");
  console.log(token);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/allblogs");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (img instanceof File && img.size > 0) {
      const storage = ref(imageDb, `files/${v4()}`);
      await uploadBytes(storage, img);
      const url = await getDownloadURL(storage);

      if (token) {
        try {
          const response = await axios.post(
            "http://localhost:5000/createblog",
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
      <div className="centered-container">
        {" "}
        {/* Add a class for centering */}
        <div className="form-container">
          {" "}
          {/* Add a class for styling the form */}
          <h1 className="m-3 text-center text-lg font-semibold">
            WRITE YOUR BLOG
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              className="m-5"
              type="file"
              ref={fileInput}
              onChange={(e) => setImg(e.target.files[0])}
            />
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 5, width: "20ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
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
                />
              </div>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 5, width: "50ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
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
                />
              </div>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 5, width: "75ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
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
                />
              </div>
            </Box>
            <center>
              <button
                type="submit"
                className="btn btn-outline-success px-4 mr-2"
                variant="contained"
              >
                Post
              </button>
              <button className="btn btn-outline-danger" type="button" onClick={logout}>Logout</button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogsCreated;
