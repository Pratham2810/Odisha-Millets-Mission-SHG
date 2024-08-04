"use client";
import NavigationBar from "@/components/NavigationBar";
import MainProductDisplay from "@/components/MainProductDisplay";
import ProductGrid from "@/components/ProductGrid";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Home() {
  // MainProductDisplay
  const mainProductControls = useAnimation();
  const mainProductRef = useRef(null);
  const isMainProductInView = useInView(mainProductRef, { once: true });

  useEffect(() => {
    if (isMainProductInView) {
      mainProductControls.start("visible");
    }
  }, [isMainProductInView, mainProductControls]);

  const mainProductVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  // ProductGrid
  const productGridControls = useAnimation();
  const productGridRef = useRef(null);
  const isProductGridInView = useInView(productGridRef, { once: true });

  useEffect(() => {
    if (isProductGridInView) {
      productGridControls.start("visible");
    }
  }, [isProductGridInView, productGridControls]);

  const productGridVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  // Testimonials
  const testimonialsControls = useAnimation();
  const testimonialsRef = useRef(null);
  const isTestimonialsInView = useInView(testimonialsRef, { once: true });

  useEffect(() => {
    if (isTestimonialsInView) {
      testimonialsControls.start("visible");
    }
  }, [isTestimonialsInView, testimonialsControls]);

  const testimonialsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {" "}
        <NavigationBar />{" "}
      </motion.div>

      <div className="min-h-screen">
        <motion.div
          ref={mainProductRef}
          variants={mainProductVariants}
          initial="hidden"
          animate={mainProductControls}
        >
          <MainProductDisplay />
        </motion.div>

        <motion.div
          ref={productGridRef}
          variants={productGridVariants}
          initial="hidden"
          animate={productGridControls}
        >
          <ProductGrid />
        </motion.div>

        <motion.div
          ref={testimonialsRef}
          variants={testimonialsVariants}
          initial="hidden"
          animate={testimonialsControls}
        >
          <Testimonials />
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
