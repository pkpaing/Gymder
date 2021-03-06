import { useState } from "react";
import Nav from "../components/Nav";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
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

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
              type="url"
              name="url1"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container"></div>
            {formData.url1 && (
              <img src={formData.url1} alt="profile pic preview" />
            )}
          </section>
          <section>
            <h3>PREFERENCES</h3>
            <label>Gym Location</label>
            <div className="multiple-input-container">
              <input
                id="north-gym-location"
                type="radio"
                name="gym_location"
                value={"North"}
                onChange={null}
                checked={null}
              />
              <label htmlFor="north-gym-location">North</label>

              <input
                id="east-gym-location"
                type="radio"
                name="gym_location"
                value={"East"}
                onChange={null}
                checked={null}
              />
              <label htmlFor="east-gym-location">East</label>

              <input
                id="south-gym-location"
                type="radio"
                name="gym_location"
                value={"South"}
                onChange={null}
                checked={null}
              />
              <label htmlFor="south-gym-location">South</label>

              <input
                id="west-gym-location"
                type="radio"
                name="gym_location"
                value={"West"}
                onChange={null}
                checked={null}
              />
              <label htmlFor="west-gym-location">West</label>

              <input
                id="central-gym-location"
                type="radio"
                name="gym_location"
                value={"Central"}
                onChange={null}
                checked={null}
              />
              <label htmlFor="central-gym-location">Central</label>
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value={"Male"}
                onChange={null}
                checked={null}
              />
              <label htmlFor="man-gender-identity">Male</label>

              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value={"Female"}
                onChange={null}
                checked={null}
              />
              <label htmlFor="woman-gender-identity">Female</label>
            </div>
            <label>Age Range</label>
            <div className="side-by-side">
              <input
                id="age_lower"
                type="number"
                name="age_lower"
                placeholder="... "
                required={true}
                onChange={null}
                checked={null}
              />
              <div className="dash">???</div>
              <input
                id="age_upper"
                type="number"
                name="age_upper"
                placeholder="... "
                required={true}
                onChange={null}
                checked={null}
              />
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
export default Onboarding;
