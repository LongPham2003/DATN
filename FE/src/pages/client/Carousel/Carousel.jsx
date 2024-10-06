import { useState, useEffect } from "react";

import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://file.hstatic.net/1000230642/file/banner_running_master.jpg",
    "https://file.hstatic.net/1000230642/file/bannerstreet_master.png",
    "https://file.hstatic.net/1000230642/file/1920x750_56f2f1c3b88b4c5584bb903ec2a69320_master.jpg",
    'https://file.hstatic.net/1000230642/file/banner_running_master.jpg',
    'https://file.hstatic.net/1000230642/file/bannerstreet_master.png',
    'https://file.hstatic.net/1000230642/file/1920x750_56f2f1c3b88b4c5584bb903ec2a69320_master.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full overflow-hidden">
    <div className="relative w-full h-64 overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}

          className={`absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
