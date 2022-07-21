import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const MyProfile = ({ setShowProfile }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [genderPref, setGenderPref] = useState([]);
  const [locationPref, setLocationPref] = useState([]);

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
    location_pref: [],
    gender_pref: [],
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
        location_pref: response.data.location_pref,
        gender_pref: response.data.gender_pref,
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

  const handleCheck = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "gender_pref") {
      var updatedList = [...genderPref];
    } else {
      var updatedList = [...locationPref];
    }

    //console.log("value is " + value);
    //console.log("index is " + checked.indexOf(value));
    //console.log("checked is " + checked);
    if (event.target.checked) {
      updatedList = [...updatedList, value];
    } else {
      updatedList.splice(updatedList.indexOf(value), 1);
    }

    if (name === "gender_pref") {
      setGenderPref(updatedList);
    } else {
      setLocationPref(updatedList);
    }

    console.log("updated list " + updatedList);
    setFormData((prevState) => ({
      ...prevState,
      [name]: updatedList,
    }));
    console.log("name is " + name);
    console.log("gender pref after is " + formData.gender_pref);
    console.log("location pref after is " + formData.location_pref);
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      checkedChange(e);
    } else if (e.target.type === "file") {
      imageChange(e);
    } else {
      const name = e.target.name;
      const value = e.target.value;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const imageChange = (e) => {
    const value = URL.createObjectURL(e.target.value);
    console.log(value);
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loadFile = (e) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
    setFormData((prevState) => ({
      ...prevState,
      ["image"]: output,
    }));
  };

  const checkedChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    const name = e.target.name;
    const newValue = isChecked;

    console.log("value " + value);
    console.log("isChecked " + isChecked);
    console.log("name " + name);
    console.log(" first form data is " + newValue);

    setFormData((prevState) => ({
      ...prevState,
      [name]: isChecked,
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
          
          <section>
            <h3>PROFILES</h3>
            <div className="edit-line">
              <label>Edit Name: </label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                placeholder={user.first_name}
                required={false}
                value={formData.first_name}
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
                value={formData.age}
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
                  checked={formData.gym_location === "North"}
                />
                <label htmlFor="north-gym-location">North</label>

                <input
                  id="east-gym-location"
                  type="radio"
                  name="gym_location"
                  value={"East"}
                  onChange={handleChange}
                  checked={formData.gym_location === "East"}
                />
                <label htmlFor="east-gym-location">East</label>

                <input
                  id="south-gym-location"
                  type="radio"
                  name="gym_location"
                  value={"South"}
                  onChange={handleChange}
                  checked={formData.gym_location === "South"}
                />
                <label htmlFor="south-gym-location">South</label>

                <input
                  id="west-gym-location"
                  type="radio"
                  name="gym_location"
                  value={"West"}
                  onChange={handleChange}
                  checked={null}
                />
                <label htmlFor="west-gym-location">West</label>
                <input
                  id="central-gym-location"
                  type="radio"
                  name="gym_location"
                  value={"Central"}
                  onChange={handleChange}
                  checked={formData.gym_location === "Central"}
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
                value={formData.training_type}
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
                required={false}
                value={formData.years_experience}
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
                  value={"Male"}
                  onChange={handleChange}
                  checked={formData.gender_identity === "Male"}
                />
                <label htmlFor="man-gender-identity">Male</label>

                <input
                  id="woman-gender-identity"
                  type="radio"
                  name="gender_identity"
                  value={"Female"}
                  onChange={handleChange}
                  checked={formData.gender_identity === "Female"}
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
                value={formData.about}
                onChange={handleChange}
              />
            </div>

            <div className="edit-line">
              <label htmlFor="about">Profile Photo: </label>
              <div className="img-container">
                {user.url1 && <img src={user.image} />}
                {user.image && (
                  <img src={user.url1} alt={"photo of " + user.first_name} />
                )}
              </div>
              <input
                type="url"
                name="url1"
                id="url"
                value={formData.url1}
                onChange={handleChange}
                required={false}
              />
            </div>
          </section>
          <section>
            <h3>PREFERENCES</h3>
            <label>Gym Location</label>
            <div className="multiple-input-container">
              <input
                id="north-gym-location"
                type="checkbox"
                name="location_pref"
                value={"North"}
                onChange={handleCheck}
                checked={formData.north_pref}
              />
              <label htmlFor="north-gym-location">North</label>

              <input
                id="east-gym-location"
                type="checkbox"
                name="location_pref"
                value={"East"}
                onChange={handleCheck}
                checked={formData.east_pref}
              />
              <label htmlFor="east-gym-location">East</label>

              <input
                id="south-gym-location"
                type="checkbox"
                name="location_pref"
                value={"South"}
                onChange={handleCheck}
                checked={formData.south_pref}
              />
              <label htmlFor="south-gym-location">South</label>

              <input
                id="west-gym-location"
                type="checkbox"
                name="location_pref"
                value={"West"}
                onChange={handleCheck}
                checked={formData.west_pref}
              />
              <label htmlFor="west-gym-location">West</label>

              <input
                id="central-gym-location"
                type="checkbox"
                name="location_pref"
                value={"Central"}
                onChange={handleCheck}
                checked={formData.central_pref}
              />
              <label htmlFor="central-gym-location">Central</label>
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="checkbox"
                name="gender_pref"
                value={"Male"}
                onChange={handleCheck}
                checked={formData.male_pref}
              />
              <label htmlFor="man-gender-identity">Male</label>

              <input
                id="woman-gender-identity"
                type="checkbox"
                name="gender_pref"
                value={"Female"}
                onChange={handleCheck}
                checked={formData.female_pref}
              />
              <label htmlFor="woman-gender-identity">Female</label>
            </div>
          </section>
          <input className="secondary-button" type="submit" />
          {handleClick}
        </form>
      </div>
    )
  );
};

export default MyProfile;
