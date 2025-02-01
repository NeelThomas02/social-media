import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async login function
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", userData);
    
    // Store user in local storage
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data.user; // Return user object to update Redux state
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async register function
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/register", userData);
    // Assuming the response contains user and token
    return {
      user: response.data.user, 
      token: response.data.token
    };
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Initial state
const initialState = {
    user: null, // Default to null
    token: null, // Optional: if you are managing tokens in Redux, keep track of the token as well
    isAuthenticated: false, // Default to false
    isLoading: false,
    error: null,
  };

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState, // Use the initialState defined above
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // Remove user from localStorage upon logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true; // Set the user as authenticated
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user)); // Store the user in localStorage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      });
  },
});

const storedUser = localStorage.getItem("user");
if (storedUser) {
  try {
    initialState.user = JSON.parse(storedUser);
    initialState.isAuthenticated = true;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    localStorage.removeItem("user"); // Clean up invalid data
  }
}

// Export logout action
export const { logout } = authSlice.actions;
export default authSlice.reducer;
