import React from "react";
import { Link } from "react-router-dom";
import './VideoPage.css';

const VideoPage = () => {
  return (
    <div className="relative h-screen w-full flex flex-col md:flex-row">

      {/* Left: Video (50%) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex justify-center items-center bg-black vdo">
        <video
          className="w-full h-full object-cover rounded-none"
          src="/videoo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Right: Text Section with Background Image (50%) */}
      <div className="text-content w-full md:w-1/2 h-1/2 md:h-full relative imgg">
        {/* Background Image */}
        <img
          src="/pixel.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay (optional) */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10 txxt"></div>

        {/* Text Content */}
        <div className=" relative z-20 h-full flex flex-col justify-center items-center md:items-start text-white text-center md:text-left p-8 ">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Welcome to Pyara
          </h1>
          <Link
            to="/Login"
            className="get-started-btn px-6 py-3 bg-white text-black font-semibold rounded-xl shadow hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
