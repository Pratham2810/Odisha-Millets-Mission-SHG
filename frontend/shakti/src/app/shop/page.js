"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

import TopNav from "@/components/TopNav";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import Loader from "@/lib/loader";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const adminToken = localStorage.getItem('adminToken');
      const response = await axios.post(
        "https://mission-shakti-419920.el.r.appspot.com/api/user/cart",
        {
          cart: [
            {
              _id: product._id,
              count: 1,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${userToken || adminToken}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Product added to cart");
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <Card sx={{ maxWidth: 300, mx: "auto", mb: 8 }}>
      <CardMedia
        component="img"
        image={
          product.images.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/300"
        }
        alt={product.title}
        sx={{ objectFit: "cover", height: 200, width: 300 }}
      />
      <CardContent sx={{ padding: "16px" }}>
        <Typography variant="h5" gutterBottom component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {product.description.substring(0, 100).concat("...")}
        </Typography>
        <div className="flex justify-between items-center">
          <Typography
            variant="body2"
            color="text.primary"
            style={{ fontSize: 16 }}
            fontWeight="bold"
          >
            Price: ₹{product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Typography variant="body2" color="text.secondary">
            Brand: {product.brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Quantity: {product.quantity}
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="bg-primary hover:bg-hard-primary"
          sx={{ mt: 4, width: "100%" }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://mission-shakti-419920.el.r.appspot.com/api/product/getAllProduct"
        );
        const { data } = response.data;
        setProducts(data.Product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <TopNav />
      <NavigationBar />
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
          <Box
            sx={{
              width: { xs: "100%", md: "25%" },
              bgcolor: "grey.100",
              p: 6,
              mr: { md: 2 },
            }}
          >
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded w-full py-2 px-4"
              />
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Sort By</h2>
              <select className="border border-gray-300 rounded w-full py-2 px-4">
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Price Range</h2>
              {/* Add a range slider for price */}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Categories</h2>
              <label className="inline-flex items-center mb-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Category 1</span>
              </label>
              <label className="inline-flex items-center mb-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Category 2</span>
              </label>
              <label className="inline-flex items-center mb-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Category 3</span>
              </label>
              <label className="inline-flex items-center mb-2">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Category 4</span>
              </label>
            </div>
          </Box>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ width: { xs: "100%", md: "75%" } }}
          >
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ShopPage;
