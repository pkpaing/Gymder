import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './Preferences.png'; 

class PreferencePage extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <img src={logo} style={{position: 'relative', height: 450, width: 1000, left: -25, bottom: -25}}/>
            <Link to="/dashboard">
                <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    position: "relative",
                    right: 220,
                    bottom: -50
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Back to home
                </button>
            </Link>
            <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    position: "relative",
                    right: -200,
                    bottom: -50
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Edit preferences
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PreferencePage;