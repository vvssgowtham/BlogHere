export const loginUser = async (email, password) => {
  try {
    const response = await fetch("https://bloghereserver.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await fetch("https://bloghereserver.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Email already exists");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
