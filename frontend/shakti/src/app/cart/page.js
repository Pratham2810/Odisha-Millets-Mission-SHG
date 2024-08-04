"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TopNav from "@/components/TopNav";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showShippingDetails, setShowShippingDetails] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');

    const fetchCartData = async () => {
      try {
        const response = await fetch(
          "https://mission-shakti-419920.el.r.appspot.com/api/user/usercart",
          {
            headers: {
              Authorization: `Bearer ${userToken || adminToken}`,
            },
          }
        );
        const data = await response.json();
        setCartItems(data.data.cart.products);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  const handlePay = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const adminToken = localStorage.getItem('adminToken');

      // Save the shipping details in localStorage
      localStorage.setItem('shippingDetails', JSON.stringify(showShippingDetails));

      // Redirect the user to the /track page
      await fetch("https://mission-shakti-419920.el.r.appspot.com/api/user/cart/createOrder", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken || adminToken}`,
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          "COD": true
        }),
      });

      // Call the API to empty the cart
      await fetch("https://mission-shakti-419920.el.r.appspot.com/api/user/emptyCart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userToken || adminToken}`,
        },
      });

    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };


  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.count,
    0
  );

  const toggleShippingDetails = () => {
    setShowShippingDetails(!showShippingDetails);
  };

  return (
    <div>
      <TopNav />
      <NavigationBar />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4 text-primary">Shopping Cart</h1>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item._id} className="mb-4 bg-white">
                <CardContent className="flex items-center">
                  <img
                    src={
                      item.product.images[0]?.url ||
                      "https://via.placeholder.com/300"
                    }
                    alt={item.product.title}
                    className="w-32 h-32 object-contain mr-4"
                  />
                  <div className="flex-grow">
                    <Typography variant="h6" component="h3">
                      {item.product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.product.description}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Price: ₹{item.product.price}
                    </Typography>
                    <div className="flex items-center mt-2">
                      <FormControl variant="outlined" size="small">
                        <p>Quantity: {item.count}</p>
                      </FormControl>
                      <Typography
                        variant="body1"
                        component="p"
                        className="ml-4"
                      >
                        Total: ₹{(item.product.price * item.count).toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} className="p-4 bg-white">
              <Typography variant="h6" component="h2" className="mb-4">
                Order Summary
              </Typography>
              <div className="mb-4">
                <Typography variant="body1" component="p">
                  Total Items:{" "}
                  {cartItems.reduce((total, item) => total + item.count, 0)}
                </Typography>
                <Typography variant="body1" component="p">
                  Total Amount: ₹{totalAmount.toFixed(2)}
                </Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                className="bg-primary hover:bg-hard-primary"
                onClick={toggleShippingDetails}
              >
                Checkout
              </Button>
              {showShippingDetails && (
                <div className="mt-4">
                  <Typography variant="h6" component="h3" className="mb-2">
                    Shipping Details
                  </Typography>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="State"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <TextField
                    label="Zip Code"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                  />
                  <Link href="/cart/track">
                    <Button
                      variant="contained"
                      color="primary"
                      className="bg-primary hover:bg-hard-primary mt-4"
                      onClick={handlePay}
                    >
                      Pay
                    </Button>
                  </Link>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
