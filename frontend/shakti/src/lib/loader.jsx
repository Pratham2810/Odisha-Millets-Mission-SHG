import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-8 h-8 border-2 border-dashed rounded-full animate-spin border-blue-600"></div>
    </div>
  );
};

export default Loader;
