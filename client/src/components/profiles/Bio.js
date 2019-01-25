import React from "react";
import isEmpty from "../../validation/is-empty";

const Bio = ({ profile }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div
          className="card card-body mb-3"
          style={{ backgroundColor: `mintcream` }}
        >
          <h3 className="text-center text-info">O meni</h3>
          <p>
            {isEmpty(profile.bio) ? (
              <span>{profile.user.name} nije navela više o sebi...</span>
            ) : (
              <span className="lead">{profile.bio}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
