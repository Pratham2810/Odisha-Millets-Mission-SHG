"use client"
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Button, Badge } from '@mui/material';
import { ShoppingCart, Search } from '@mui/icons-material';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');

    if (userToken || adminToken) {
      setIsLoggedIn(true);
      setIsAdmin(adminToken ? true : false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const adminToken = localStorage.getItem('adminToken');

      let apiUrl;
      if (userToken) {
        apiUrl = 'https://mission-shakti-419920.el.r.appspot.com/api/user/logout';
        localStorage.removeItem('userToken');
      } else if (adminToken) {
        apiUrl = 'https://mission-shakti-419920.el.r.appspot.com/api/user/logout';
        localStorage.removeItem('adminToken');
      }

      await axios.post(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${userToken || adminToken}`,
        },
      });

      setIsLoggedIn(false);
      setIsAdmin(false);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00B207', marginBottom: 2 }}>
      <Toolbar className="flex justify-between items-center">
        <div className="flex items-center flex-wrap ">
          <Link legacyBehavior href="/">
            <a>
              <Image src="/logo.png" alt="Shakti" width={75} height={75} />
            </a>
          </Link>
          <div className="ml-4 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search sx={{ color: 'white' }} />
              </div>
              <InputBase
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
                sx={{
                  pl: '12px',
                  pr: '2rem',
                  borderRadius: '4px',
                  backgroundColor: '#84D187',
                  color: 'black',
                }}
              />
            </div>
          </div>
          <Link href="/shop">
            <h3 className="ml-4 text-white underline">Shop</h3>
          </Link>
          <Link href="/forum">
            <h3 className="ml-4 text-white underline">Forum</h3>
          </Link>
          <Link href="/cart/track">
            <h3 className="ml-4 text-white underline">Track</h3>
          </Link>
          <Link href="/blog">
            <h3 className="ml-4 text-white underline">Blog</h3>
          </Link>
          {isAdmin && (
            <>
              <Link href="/products">
                <h3 className="ml-4 text-white underline">Products</h3>
              </Link>
              <Link href="/analytics">
                <h3 className="ml-4 text-white underline">Analytics</h3>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center">
          <Link legacyBehavior href="/cart">
            <a>
              <IconButton aria-label="cart" sx={{ color: 'white' }}>
                <Badge color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </a>
          </Link>
          {!isLoggedIn ? (
            <Link href="/signup">
              <div className="ml-4">
                <Button variant="outlined" className="hover:bg-white hover:text-primary" sx={{ color: 'white', borderColor: 'white' }}>
                  Login / Signup
                </Button>
              </div>
            </Link>
          ) : (
            <div className="ml-4">
              <Link href="/">
              <Button variant="outlined" className="hover:bg-white hover:text-primary" sx={{ color: 'white', borderColor: 'white' }} onClick={handleLogout}>
                Logout
              </Button>
              </Link>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;