import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const MoreInfo = ({ setShowInfo }) => {
  const handleClick = () => {
    setShowInfo(false);
  };

  return (
    <div className="more-info">
      <div className="info-close-icon" onClick={handleClick}>
        ✘
      </div>
      More Info
    </div>
  );
};

export default MoreInfo;
