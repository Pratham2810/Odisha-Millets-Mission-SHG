"use client"
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';


const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card className="max-w-[300px] mx-auto mb-8">
      <CardMedia component="img" sx={{width:300, height:250}} image={product.images[0]?.url || 'https://via.placeholder.com/300'} alt={product.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.substring(0, 100).concat("...")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ₹{product.price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="mt-4 bg-primary hover:bg-hard-primary"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userToken = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
        const response = await axios.get('https://mission-shakti-419920.el.r.appspot.com/api/product/getAllProduct', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setProducts(response.data.data.Product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const userToken = localStorage.getItem('userToken') || localStorage.getItem('adminToken');
      await axios.post('https://mission-shakti-419920.el.r.appspot.com/api/user/cart', { cart: [{ _id: product._id, count: 1 }] }, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      toast.success('Product added to cart');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mx-auto max-w-5xl mt-8">
      <h1 className="text-center font-[poppins] font-medium text-2xl mb-4">
        Introducing Our Products
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductGrid;