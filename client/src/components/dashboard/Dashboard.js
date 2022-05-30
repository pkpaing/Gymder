import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
    render() {
        return (
          <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="col s12 center-align">
                <h1>
                  <b>Welcome!</b> 
                </h1>
                <br />
                <br />
                <br />
                <p className="flow-text grey-text text-darken-1">
                  What would you like to do?
                </p>
                <br />
                <Link to="/profile">
                <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    position: "absolute",
                    right: 1050
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  View Profile
                </button>
                </Link>
                <Link to="/match">
                <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    position: "absolute",
                    right: 720
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Find Matches
                </button>
                </Link>
                <Link to="/preference">
                <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    position: "absolute",
                    right: 420
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Set Preferences
                </button>
                </Link>
                <Link to="/chat">
                <button
                  style={{
                    width: "250px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    position: "absolute",
                    right: 100
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  View Chats
                </button>
                </Link>
              </div>
            </div>
          </div>
        );
      }
    }
export default Dashboard;