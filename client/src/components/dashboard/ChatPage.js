import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from './Chat.png'; 

class ChatPage extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <img src={logo} style={{position: 'relative', height: 650, width: 1050, bottom: -60}}/>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPage;