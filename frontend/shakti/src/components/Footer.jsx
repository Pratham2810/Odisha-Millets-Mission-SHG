import React from "react";

const Footer = () => {
  return (
    <footer className="bg-hard-primary text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">About</h3>
            <p>Mission Shakti by Odisha Gov</p>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Links</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Social Links</h3>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <p>HIG-109, Jagamara - Sundarpada Rd, Gandamunda, Pokhariput, Bhubaneswar, Odisha 751030</p>
            <p>Email: missionshakti.od@gov.in</p>
            <p>Phone: +91 6742974093</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-600" />

        {/* Made with love */}
        <div className="flex justify-between items-center">
          <p>Made with love by KIIT</p>
          <p>&copy; 2024 Mission Shakti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
