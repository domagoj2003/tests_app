import React from "react";
import isEmpty from "../../validation/is-empty";

const Bio = ({ profile }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">Malo o meni...</h3>
          <p>
            {isEmpty(profile.bio) ? (
              <span>{profile.user.name} nije navela više o sebi...</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Bio;
