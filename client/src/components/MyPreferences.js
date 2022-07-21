import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const MyPreferences = ({ setShowPreferences }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;

  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    north_pref: true,
    south_pref: true,
    east_pref: true,
    west_pref: true,
    central_pref: true,
    male_pref: true,
    female_pref: true,
  });

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
      console.log("hello", response.data.about);
      setFormData({
        user_id: cookies.UserId,
        north_pref: response.data.north_pref,
        south_pref: response.data.south_pref,
        east_pref: response.data.east_pref,
        west_pref: response.data.west_pref,
        central_pref: response.data.central_pref,
        male_pref: response.data.male_pref,
        female_pref: response.data.female_pref,
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
      const response = await axios.put("http://localhost:8000/user", {
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
      e.target.type === "checkbox" ? checkedChange(e) : e.target.value;
    const name = e.target.name;

    if (e.target.type !== "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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

  const handleClick = () => {
    setShowPreferences(false);
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
            <h3>PREFERENCES</h3>
            <label>Gym Location</label>
            <div className="multiple-input-container">
              <input
                id="north-gym-location"
                type="checkbox"
                name="location_preference"
                value={"North"}
                onChange={handleChange}
                checked={null}
              />
              <label htmlFor="north-gym-location">North</label>

              <input
                id="east-gym-location"
                type="checkbox"
                name="location_preference"
                value={"East"}
                onChange={handleChange}
                checked={null}
              />
              <label htmlFor="east-gym-location">East</label>

              <input
                id="south-gym-location"
                type="checkbox"
                name="location_preference"
                value={"South"}
                onChange={handleChange}
                checked={null}
              />
              <label htmlFor="south-gym-location">South</label>

              <input
                id="west-gym-location"
                type="checkbox"
                name="location_preference"
                value={"West"}
                onChange={handleChange}
                checked={null}
              />
              <label htmlFor="west-gym-location">West</label>

              <input
                id="central-gym-location"
                type="checkbox"
                name="location_preference"
                value={"Central"}
                onChange={handleChange}
                checked={null}
              />
              <label htmlFor="central-gym-location">Central</label>
            </div>
            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="checkbox"
                name="gender_preference"
                value={"Male"}
                onChange={handleChange}
                checked={null}
              />
              <label htmlFor="man-gender-identity">Male</label>

              <input
                id="woman-gender-identity"
                type="checkbox"
                name="gender_preference"
                value={"Female"}
                onChange={handleChange}
                checked={null}
              />
              <label htmlFor="woman-gender-identity">Female</label>
            </div>
            <label>Age Range</label>
            <div className="side-by-side">
              <input
                id="age_lower"
                type="number"
                name="age_preference_lower"
                placeholder="... "
                required={true}
                onChange={handleChange}
                checked={null}
              />
              <div className="dash">—</div>
              <input
                id="age_upper"
                type="number"
                name="age_preference_upper"
                placeholder="... "
                required={true}
                onChange={handleChange}
                checked={null}
              />
            </div>
          </section>

          <input className="secondary-button" type="submit" />
          {handleClick}
        </form>
      </div>
    )
  );
};

export default MyPreferences;
