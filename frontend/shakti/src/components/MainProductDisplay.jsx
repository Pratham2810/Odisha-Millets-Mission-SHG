"use client"
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, LocalShipping, HeadsetMic, CreditCard, VerifiedUser } from '@mui/icons-material';


const MainProductDisplay = () => {
  const images = ["/header1.jpg", "/header2.jpg", "/header3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative mt-2 w-full mx-auto max-w-6xl">
      <IconButton className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent text-white rounded-lg" onClick={prevSlide}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent text-white rounded-lg" onClick={nextSlide}>
        <KeyboardArrowRight />
      </IconButton>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="w-full rounded-lg shadow-lg" />

      <div className="featured flex flex-wrap justify-around items-center p-10 w-full rounded-lg bg-slate-100 z-5 mt-4">
        <div className="flex justify-center items-center gap-4">
          <LocalShipping fontSize="large" />
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#1a1a1a] font-semibold">Free Shipping</div>
            <div className="text-[#999] text-sm">Free shipping on all your order</div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <HeadsetMic fontSize="large" />
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#1a1a1a] font-semibold">Customer Support 24/7</div>
            <div className="text-[#999] text-sm">Instant access to Support</div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <CreditCard fontSize="large" />
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#1a1a1a] font-semibold">100% Secure Payment</div>
            <div className="text-[#999] text-sm">We ensure your money is save</div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <VerifiedUser fontSize="large" />
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="text-[#1a1a1a] font-semibold">Money-Back Guarantee</div>
            <div className="text-[#999] text-sm">30 Days Money-Back Guarantee</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProductDisplay;
