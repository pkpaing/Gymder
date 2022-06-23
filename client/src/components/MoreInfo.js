import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const MoreInfo = ({ setShowInfo, cardUser, filteredUsers, setCardUser }) => {
  const handleClick = () => {
    setShowInfo(false);
  };

  if (cardUser === null) {
    setCardUser(filteredUsers[filteredUsers.length - 1]);
  }

  return (
    cardUser && (
      <div className="my-profile">
        <div className="profile-close-icon" onClick={handleClick}>
          ✘
        </div>
        <div className="profile-img-container">
          <img src={cardUser.url1} alt={"photo of " + cardUser.first_name} />
        </div>
        <div className="about">{cardUser.about}</div>
        <div className="info">
          Name: {cardUser.first_name}
          <br />
          <br />
          Gender: {cardUser.gender_identity}
          <br />
          <br />
          Age: {cardUser.age}
          <br />
          <br />
          Gym Location: {cardUser.gym_location}
          <br />
          <br />
          Training Type: {cardUser.training_type}
          <br />
          <br />
          Years of Experience: {cardUser.years_experience}
        </div>
      </div>
    )
  );
};

export default MoreInfo;
