import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const MyProfile = ({ setShowProfile }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;

  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    age: "",
    gym_location: "north",
    training_type: "",
    years_experience: "",
    gender_identity: "Male",
    url1: "",
    about: "",
    matches: [],
  });

  const getUser = async () => {
    try {
      const response = await axios.get("https://gymder.herokuapp.com/user", {
        params: { userId },
      });
      setUser(response.data);
      console.log("hello", response.data.about);
      setFormData({
        user_id: cookies.UserId,
        first_name: response.data.first_name,
        age: response.data.age,
        gym_location: response.data.gym_location,
        training_type: response.data.training_type,
        years_experience: response.data.years_experience,
        gender_identity: response.data.gender_identity,
        url1: response.data.url1,
        about: response.data.about,
        matches: response.data.matches,
      });
    } catch (error) {
      console.log(error);
    }
  };

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try {
      const response = await axios.put("https://gymder.herokuapp.com/user", {
        formData,
      });
      console.log(response);
      const success = response.status === 200;
      if (success) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      document.location.reload(true);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        <form onSubmit={handleSubmit}>
          <div className="edit-line">
            <label>Edit Name: </label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder={user.first_name}
              required={false}
              value={user.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="edit-line">
            <label>Edit Age: </label>
            <input
              id="age"
              type="number"
              name="age"
              placeholder={user.age}
              required={false}
              value={user.age}
              onChange={handleChange}
            />
          </div>

          <div className="edit-line">
            <div className="Gym-location-container">
              <label>
                Edit Gym Location: <b>{user.gym_location}</b>
              </label>
            </div>
            <div className="multiple-input-container">
              <input
                id="north-gym-location"
                type="radio"
                name="gym_location"
                value={"North"}
                onChange={handleChange}
                checked={user.gym_location === "North"}
              />
              <label htmlFor="north-gym-location">North</label>

              <input
                id="east-gym-location"
                type="radio"
                name="gym_location"
                value={"East"}
                onChange={handleChange}
                checked={user.gym_location === "East"}
              />
              <label htmlFor="east-gym-location">East</label>

              <input
                id="south-gym-location"
                type="radio"
                name="gym_location"
                value={"South"}
                onChange={handleChange}
                checked={user.gym_location === "South"}
              />
              <label htmlFor="south-gym-location">South</label>

              <input
                id="west-gym-location"
                type="radio"
                name="gym_location"
                value={"West"}
                onChange={handleChange}
                checked={user.gym_location === "West"}
              />
              <label htmlFor="west-gym-location">West</label>
              <input
                id="central-gym-location"
                type="radio"
                name="gym_location"
                value={"Central"}
                onChange={handleChange}
                checked={user.gym_location === "Central"}
              />
              <label htmlFor="central-gym-location">Central</label>
            </div>
          </div>

          <div className="edit-line">
            <label htmlFor="training_type">Training Type: </label>
            <input
              id="training_type"
              type="text"
              name="training_type"
              placeholder={user.training_type}
              required={false}
              value={user.training_type}
              onChange={handleChange}
            />
          </div>

          <div className="edit-line">
            <label>Years of Experience: </label>
            <input
              id="years_experience"
              type="number"
              name="years_experience"
              placeholder={user.years_experience}
              required={true}
              value={user.years_experience}
              onChange={handleChange}
            />
          </div>

          <div className="edit-line">
            <label>
              Edit Gender: <b>{user.gender_identity}</b>
            </label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value={user.gender_identity}
                onChange={handleChange}
                checked={user.gender_identity === "Male"}
              />
              <label htmlFor="man-gender-identity">Male</label>

              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value={"Female"}
                onChange={handleChange}
                checked={user.gender_identity === "Female"}
              />
              <label htmlFor="woman-gender-identity">Female</label>
            </div>
          </div>

          <div className="edit-line">
            <label htmlFor="about">About Me: </label>
            <input
              id="about"
              type="text"
              name="about"
              placeholder={user.about}
              required={false}
              value={user.about}
              onChange={handleChange}
            />
          </div>

          <div className="edit-line">
            <label htmlFor="about">Profile Photo: </label>
            <div className="img-container">
              <img src={user.url1} alt={"photo of " + user.first_name} />
            </div>
            <input
              type="url"
              name="url1"
              id="url"
              value={user.url1}
              onChange={handleChange}
              required={false}
            />
          </div>

          <input className="secondary-button" type="submit" />
          {handleClick}
        </form>
      </div>
    )
  );
};

export default MyProfile;
