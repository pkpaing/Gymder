import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './Match.png'; 

class MatchPage extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <br />
            <br />
            <br />
            <img src={logo} style={{position: 'relative', height: 500, width: 1000}}/>
            <Link to="/dashboard">
                <button
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Back to home
                </button>
              </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchPage;