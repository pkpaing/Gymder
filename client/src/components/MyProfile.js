import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const MyProfile = ({ setShowProfile }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setShowProfile(false);
  };

  useEffect(() => {
    getUser();
  }, []);
  console.log("user", user);

  return (
    user && (
      <div className="my-profile">
        <div className="profile-close-icon" onClick={handleClick}>
          ✘
        </div>
        <div className="profile-img-container">
          <img src={user.url1} alt={"photo of " + user.first_name} />
        </div>
        <div className="about">{user.about}</div>
        <div className="info">
          Name: {user.first_name}
          <br />
          <br />
          Gender: {user.gender_identity}
          <br />
          <br />
          Age: {user.age}
          <br />
          <br />
          Gym Location: {user.gym_location}
          <br />
          <br />
          Training Type: {user.training_type}
          <br />
          <br />
          Years of Experience: {user.years_experience}
        </div>
      </div>
    )
  );
};

export default MyProfile;
