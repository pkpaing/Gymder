import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import loadingGif from "../images/LoadingGif.gif";

const LoadingScreen = ({ setLoading }) => {
  const handleClick = () => {
    setLoading(false);
  };

  return (
    <div className="loading-screen">
      <div className="loading-close-icon" onClick={handleClick}>
        ✘
      </div>
      <img
        className="loading-gif"
        src={loadingGif}
        alt="wait until the page loads"
      />
    </div>
  );
};

export default LoadingScreen;
