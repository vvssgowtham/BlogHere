import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { imageDb } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import TextField from "@mui/material/TextField";
import "./createblog.css";
import Navbar from "./Navbar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useMediaQuery from "@mui/material/useMediaQuery";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../fetchers/fetcherBlogs";

function BlogsCreated() {
  const isMediumScreen = useMediaQuery("(max-width: 900px)"); // This hook returns true if the screen size is less than 900px
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
  const [loading, setLoading] = useState(false); // State variable for loading

  const queryClient = useQueryClient();

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken("");
    navigate("/allblogs");
  };

  const mutation = useMutation({
    mutationFn: async (newBlog) => {
      try {
        const response = await createBlog(newBlog, token);
        console.log(response); // Log the response to inspect
        return response.data;
      } catch (error) {
        console.error("Error creating blog:", error); // Log detailed error
        throw error; // Re-throw the error to be caught in onError
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allblogs"] });
      if (token) {
        queryClient.invalidateQueries({ queryKey: ["myblogs", token] });
      }
      alert("Blog created successfully");
      setformData({ imageURL: "", title: "", description: "", blogcontent: "" });
      setImg(null);
      fileInput.current.value = "";
      setLoading(false);
    },
    onError: (error) => {
      console.error("Failed to create blog:", error); // Log detailed error
      alert("Failed to create blog");
      setLoading(false);
    },
  });  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading backdrop

    if (img instanceof File && img.size > 0) {
      const storage = ref(imageDb, `files/${v4()}`);
      await uploadBytes(storage, img);
      const url = await getDownloadURL(storage);

      if (token) {
        // Trigger the mutation
        mutation.mutate({ ...formData, imageURL: url });
      }
    } else {
      alert("Please select an image file");
      setLoading(false); // Hide loading backdrop if there's an error
    }
  };

  return (
    <div>
      <Navbar />
      <div className="centered-container">
        <div className="form-container max-w-4xl mx-auto p-4">
          <h1 className="text-center text-lg font-semibold mb-4">
            WRITE YOUR BLOG
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-4">
              <input
                className="w-full"
                type="file"
                ref={fileInput}
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
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
                // className="w-full" // Set width to 100% on all screen sizes
              />
            </div>
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
                inputProps={{ maxLength: 100 }}
              />
            </div>
            <div className="w-full mb-4">
              {isMediumScreen ? (
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
                  className="w-full"
                />
              ) : (
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.blogcontent}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setformData({ ...formData, blogcontent: data });
                  }}
                  className="w-full"
                />
              )}
            </div>
            <div className="w-full text-center">
              <button
                type="submit"
                className="btn btn-outline-success px-4 mr-2"
                // eslint-disable-next-line react/no-unknown-property
                variant="contained"
                disabled={loading || mutation.isLoading} // Disable button while loading
              >
                {mutation.isLoading ? "Posting..." : "Post"}
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || mutation.isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default BlogsCreated;
