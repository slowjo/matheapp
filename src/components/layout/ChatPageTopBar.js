import React from "react";
import { Link } from "react-router-dom";

const ChatPageTopBar = ({ selectedUser }) => {
  return (
    <div className="top-bar">
      <Link to="/" className="top-bar-arrow">
        <i className="fas fa-arrow-left"></i>
      </Link>
      <div className="top-bar-user">
        <i className="fas fa-user"></i>
      </div>
      <div className="top-bar-info">
        <div className="top-bar-user-name">{selectedUser.name}</div>
        <div className="top-bar-last-seen">
          {selectedUser.online ? "online" : "vor 3 Stunden"}
        </div>
      </div>
    </div>
  );
};

export default ChatPageTopBar;
