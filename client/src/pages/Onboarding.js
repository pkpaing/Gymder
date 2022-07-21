import { useState } from "react";
import Nav from "../components/Nav";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [genderPref, setGenderPref] = useState([]);
  const [locationPref, setLocationPref] = useState([]);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    first_name: "",
    age: "",
    gym_location: "north",
    training_type: "",
    years_experience: "",
    gender_identity: "Male",
    image: "",
    about: "",
    matches: [],
    location_pref: [],
    gender_pref: [],
  });

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

  const loadFile = (e) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(e.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
    setFormData((prevState) => ({
      ...prevState,
      ["image"]: output.src,
    }));
    console.log(output.src);
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
    loadFile(e);
    const name = e.target.name;
    const value = URL.createObjectURL(e.target.files[0]);
    console.log("name is " + name);
    console.log("value is " + value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
    console.log("form data is " + newValue);

    setFormData((prevState) => ({
      ...prevState,
      [name]: isChecked,
    }));
  };

  console.log(formData);

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />

            <label>Age</label>
            <input
              id="age"
              type="number"
              name="age"
              placeholder="... "
              required={true}
              value={formData.age}
              onChange={handleChange}
            />

            <label>Gym Location</label>
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
                checked={formData.gym_location === "West"}
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

            <label htmlFor="training_type">Training Type</label>
            <input
              id="training_type"
              type="text"
              name="training_type"
              placeholder="e.g. building muscle"
              required={true}
              value={formData.training_type}
              onChange={handleChange}
            />

            <label>Years of Experience</label>
            <input
              id="years_experience"
              type="number"
              name="years_experience"
              placeholder="... "
              required={true}
              value={formData.years_experience}
              onChange={handleChange}
            />

            <label>Gender</label>
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

            <label htmlFor="about">About Me</label>
            <input
              id="about"
              type="text"
              name="about"
              placeholder="I like long walks..."
              required={true}
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>
          <section>
            <label htmlFor="about">Profile Photo</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={imageChange}
            />
            <div className="photo-container">{<img id="output" />}</div>
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
        </form>
      </div>
    </>
  );
};
export default Onboarding;
