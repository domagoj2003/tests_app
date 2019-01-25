import React from "react";
import { Link } from "react-router-dom";

const Header = ({ profile }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div
          className="card card-body text-white mb-3"
          style={{ backgroundColor: `dodgerblue` }}
        >
          <div className="row">
            <div className="col-4 col-md-3 m-auto">
              <img
                className="rounded-circle"
                src={profile.user.avatar}
                alt=""
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-center">{profile.user.name}</h1>
            <p className="lead text-center">{profile.grade} Razred</p>
            <p className="lead text-center">
              {profile.school}, {profile.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
