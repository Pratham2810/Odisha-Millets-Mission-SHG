"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginSignupPage = () => {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    role: "User",
    brandname: "", // Add brandname field for admin registration
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let apiUrl, requestBody;
      if (showLogin) {
        if (formData.role === "Admin") {
          apiUrl = "https://mission-shakti-419920.el.r.appspot.com/api/user/adminlogin";
          requestBody = { email: formData.email, password: formData.password };
        } else {
          apiUrl = "https://mission-shakti-419920.el.r.appspot.com/api/user/login";
          requestBody = { email: formData.email, password: formData.password };
        }
      } else {
        if (formData.role === "Admin") {
          apiUrl = "https://mission-shakti-419920.el.r.appspot.com/api/user/registeradmin";
          requestBody = {
            brandname: formData.brandname,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
          };
        } else {
          apiUrl = "https://mission-shakti-419920.el.r.appspot.com/api/user/register";
          requestBody = formData;
        }
      }

      const response = await axios.post(apiUrl, requestBody);
      console.log(response.data);

      if (showLogin) {
        if (formData.role === "Admin") {
          localStorage.setItem("adminToken", response.data.token);
          router.push("/products");
        } else {
          localStorage.setItem("userToken", response.data.token);
          router.push("/shop");
        }
      } else {
        setShowLogin(true);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          mobile: "",
          password: "",
          role: "User",
          brandname: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="p-8">
          <Typography variant="h5" className="text-center mb-6">
            {showLogin ? "Login" : "Sign Up"}
          </Typography>
          <form onSubmit={handleSubmit}>
            {!showLogin && (
              <div className="mb-4">
                <TextField
                  label="First Name"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </div>
            )}
            {!showLogin && (
              <div className="mb-4">
                <TextField
                  label="Last Name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
              />
            </div>
            {!showLogin && (
              <div className="mb-4">
                <TextField
                  label="Mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </div>
            )}
            {!showLogin && formData.role === "Admin" && (
              <div className="mb-4">
                <TextField
                  label="Brand Name"
                  name="brandname"
                  value={formData.brandname}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <TextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                select
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </TextField>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="bg-primary hover:bg-hard-primary"
            >
              {showLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <Typography variant="body2" className="text-center mt-4">
            {showLogin ? "Don't have an account?" : "Already have an account?"}
            <Button
              color="primary"
              onClick={() => setShowLogin(!showLogin)}
              className="ml-2 text-primary hover:text-hard-primary"
            >
              {showLogin ? "Sign Up" : "Login"}
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginSignupPage;