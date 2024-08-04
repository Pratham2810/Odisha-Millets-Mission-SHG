"use client"
import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import TopNav from "@/components/TopNav";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import axios from 'axios';

const TrackOrderPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const orderCall = async () => {
      const userToken = localStorage.getItem('userToken');
      const adminToken = localStorage.getItem('adminToken');
      try {
        const actualOrders = await axios.get("https://mission-shakti-419920.el.r.appspot.com/api/user/getUserOrders", {
          headers: {
            Authorization: `Bearer ${userToken || adminToken}`
          }
        });
        console.log(actualOrders.data.data.oders);
        setOrders([actualOrders.data.data.oders]);
      } catch (error) {
        console.error(error);
        setOrders([]);
      }
    }

    orderCall()
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <TopNav />
      <NavigationBar />
      <Container maxWidth="lg" className="my-8">
        <Paper className="p-6 bg-white shadow-lg">
          <Typography variant="h4" gutterBottom className="text-gray-800">
            Track Your Order
          </Typography>
          <div className="flex justify-between items-center mb-6">
            <div className="w-full md:max-w-md mr-2">
              <input
                type="text"
                placeholder="Enter your order number"
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-2 "
                style={{ border: '1px solid #696969' }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              className="bg-soft-primary hover:bg-hard-primary text-white font-medium py-2 px-4 rounded-md"
            >
              Search
            </Button>
          </div>
          <Divider className="my-6" />

          {orders?.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="mb-4 p-4 border rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
                <p className="text-gray-600 mb-1">Order Status: {order.orderStatus}</p>
                <p className="text-gray-600 mb-1">Created At: {new Date(order.createdAt).toLocaleString()}</p>
                {order.products.map((product) => (
                  <div key={product._id} className="border-t border-gray-300 pt-2 mt-2">
                    <p className="text-gray-800 font-semibold">Product ID: {product._id}</p>
                    {/* Add more details about the product here */}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">
              No orders to track.
            </div>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default TrackOrderPage;