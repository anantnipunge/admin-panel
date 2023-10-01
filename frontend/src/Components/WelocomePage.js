import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="bg-blue-500 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome, Admin!
        </h1>
        <p className="text-gray-600">
          You can easily add product information here.
        </p>
        <Link to="/upload">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
