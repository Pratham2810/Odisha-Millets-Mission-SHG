"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Container,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const AnalyticsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.get('https://mission-shakti-419920.el.r.appspot.com/api/user/getSellerOrders', {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });
        console.log('Orders:', response.data);

        setOrders(response.data.data.oders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Mock data for analytics
  const mockData = [
    { month: 'Jan', orders: 50, revenue: 10000 },
    { month: 'Feb', orders: 60, revenue: 12000 },
    { month: 'Mar', orders: 70, revenue: 14000 },
    { month: 'Apr', orders: 80, revenue: 16000 },
    { month: 'May', orders: 75, revenue: 15000 },
    { month: 'Jun', orders: 90, revenue: 18000 },
    { month: 'Jul', orders: 85, revenue: 17000 },
    { month: 'Aug', orders: 95, revenue: 19000 },
    { month: 'Sep', orders: 80, revenue: 16000 },
    { month: 'Oct', orders: 90, revenue: 18000 },
    { month: 'Nov', orders: 85, revenue: 17000 },
    { month: 'Dec', orders: 100, revenue: 20000 },
  ];

  const predictedOrders = 110;

  return (
    <>
      <NavigationBar />
      <Container maxWidth="xl" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Seller Analytics
            </Typography>
          </Grid>

          {/* Monthly Order Frequency */}
          <Grid item xs={12} md={6} >
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Monthly Order Frequency
                </Typography>
                <BarChart width={500} height={300} data={mockData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>
          </Grid>

          {/* Monthly Price Revenue */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Monthly Price Revenue
                </Typography>
                <LineChart width={500} height={300} data={mockData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                </LineChart>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Prediction */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Order Prediction
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="h4" gutterBottom>
                    {predictedOrders}
                  </Typography>
                  <Typography variant="body1">Predicted Orders for Next Month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Actual Orders */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Actual Orders
                </Typography>
                {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Order ID</TableCell>
                          <TableCell>Payment Method</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Created At</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell>{order._id}</TableCell>
                            <TableCell>{order.paymentIntent.method}</TableCell>
                            <TableCell>${order.paymentIntent.amount}</TableCell>
                            <TableCell>{order.orderStatus}</TableCell>
                            <TableCell>{order.createdAt}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AnalyticsPage;