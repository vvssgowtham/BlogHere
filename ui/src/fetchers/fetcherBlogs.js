/* eslint-disable no-useless-catch */
export const fetchAllBlogs = async () => {
    try {
        const response = await fetch("https://bloghereserver.onrender.com/allblogs");
        if (!response.ok) {
        throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchReadAllBlogs = async (id) => {
    try {
        const response = await fetch(`https://bloghereserver.onrender.com/allblogs/${id}`);
        if (!response.ok) {
        throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchMyBlogs = async (token) => {
    try {
        const response = await fetch("https://bloghereserver.onrender.com/myblogs", {
        headers: {
            "x-token": token,
        },
        });
        if (!response.ok) {
        throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const fetchBlog = async (id) => {
    try {
        const response = await fetch(`https://bloghereserver.onrender.com/allblogs/${id}`);
        if (!response.ok) {
        throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const deleteBlog = async (id, token) => {
    try {
        const response = await fetch(`https://bloghereserver.onrender.com/myblogs/${id}`, {
        method: "DELETE",
        headers: {
            "x-token": token,
        },
        });
        if (!response.ok) {
        throw new Error("Failed to delete blog");
        }
        const data = await response.text();
        return data;
    } catch (error) {
        throw error;
    }
}

export const createBlog = async (newBlog, token) => {
    try {
      const response = await fetch("https://bloghereserver.onrender.com/createblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": token, 
        },
        body: JSON.stringify(newBlog),
      });
      if (!response.ok) {
        throw new Error("Failed to create blog: " + response.statusText);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  