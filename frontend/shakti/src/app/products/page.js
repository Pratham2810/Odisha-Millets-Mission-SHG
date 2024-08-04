"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { AddAPhoto } from '@mui/icons-material';
import TopNav from "@/components/TopNav";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    quantity: 0,
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get('https://mission-shakti-419920.el.r.appspot.com/api/product/getAllProduct/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data.data.Product);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post('https://mission-shakti-419920.el.r.appspot.com/api/product/createProduct/', newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts([...products, response.data.data.Product]);
      setSelectedProduct(response.data.data.Product);
      setShowImageUpload(true);
      setNewProduct({
        title: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        quantity: 0,
      });
    } catch (error) {
      console.error('Error creating product:', error);
      setSnackbarOpen(true);
      setSnackbarMessage('Error creating product');
      setSnackbarSeverity('error');
    }
  };

  const handleImageUpload = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('images', image);
      console.log('selectedProduct:', selectedProduct._id)
      const response = await axios.put(
        `https://mission-shakti-419920.el.r.appspot.com/api/product/upload/${selectedProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSelectedProduct(response.data.data.Product);
      setShowImageUpload(false);
      setSnackbarOpen(true);
      setSnackbarMessage('Image uploaded successfully');
      setSnackbarSeverity('success');
    } catch (error) {
      console.error('Error uploading image:', error);
      setSnackbarOpen(true);
      setSnackbarMessage('Error uploading image');
      setSnackbarSeverity('error');
    }
  };

  const handleInputChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <TopNav />
      <NavigationBar />
      <Container maxWidth="lg" className="my-8">
        <Paper className="p-6 bg-white shadow-lg">
          <Typography variant="h4" gutterBottom className="text-gray-800 font-bold">
            Products
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper className="p-4 bg-gray-100 shadow-md">
                <Typography variant="h5" gutterBottom className="text-gray-800 font-bold">
                  Add New Product
                </Typography>
                <TextField
                  label="Title"
                  name="title"
                  value={newProduct.title}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  className="mb-4"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  className="mb-4"
                />
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  className="mb-4"
                />
                <TextField
                  label="Category"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  className="mb-4"
                />
                <TextField
                  label="Brand"
                  name="brand"
                  value={newProduct.brand}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  className="mb-4"
                />
                <TextField
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={newProduct.quantity}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  className="mb-4"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateProduct}
                  className="bg-hard-primary hover:bg-soft-primary text-white font-medium py-2 px-4 rounded-md"
                >
                  Create Product
                </Button>
                {showImageUpload && (
                  <div className="mt-4 mb-2">
                    <input type="file" onChange={handleImageChange} />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleImageUpload}
                      className="bg-hard-primary mt-2 hover:bg-soft-primary text-white font-medium py-2 px-4 rounded-md "
                    >
                      Add Image
                    </Button>
                  </div>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Paper className="p-4 bg-white shadow-md">
                <Typography variant="h5" gutterBottom className="text-gray-800 font-bold">
                  All Products
                </Typography>
                <Grid container spacing={4}>
                  {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                      <Paper className="p-4 bg-gray-100 shadow-md">
                        <img
                          src={product.images.length ? product.images[0].url : 'https://via.placeholder.com/150'}
                          alt={product.title}
                          className="w-48 h-48 mb-4 rounded-md"
                        />
                        <Typography variant="h6" className="text-gray-800 font-bold mb-2">
                          {product.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 mb-2 line-clamp-2">
                          {product.description.substring(0, 100).concat("...")}
                        </Typography>
                        <div className="flex items-center mb-2 flex-wrap">
                          <Chip
                            label={`Price: ₹${product.price}`}
                            className="mr-2 mb-2 bg-soft-primary text-white"
                          />
                          <Chip
                            label={`Quantity: ${product.quantity}`}
                            className="mr-2 mb-2 bg-soft-primary text-white"
                          />
                          <Chip
                            label={product.category}
                            className="mr-2 mb-2 bg-soft-primary text-white"
                          />
                          <Chip
                            label={product.brand}
                            className="mr-2 mb-2 bg-soft-primary text-white"
                          />
                        </div>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <ToastContainer />
    </>
  );
};

export default ProductsPage;
