import { useState } from "react";
import Nav from "../components/Nav";

const Onboarding = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    first_name: "",
    age: "",
    gym_location: "north",
    training_type: "",
    gender_identity: "male",
    email: "",
    url1: "",
    about: "",
    matches: [],
  });

  const handleSubmit = (e) => {
    console.log("submitted");
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

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value={"male"}
                onChange={handleChange}
                checked={formData.gender_identity === "male"}
              />
              <label htmlFor="man-gender-identity">Male</label>

              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value={"female"}
                onChange={handleChange}
                checked={formData.gender_identity === "female"}
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
            <img src={formData.url1} alt="profile pic preview" />
          </section>
        </form>
      </div>
    </>
  );
};
export default Onboarding;
