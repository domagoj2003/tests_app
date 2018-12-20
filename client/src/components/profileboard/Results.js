import React from "react";
import isEmpty from "../../validation/is-empty";

const Results = ({ profile }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">Rezultati</h3>
          <p>
            {isEmpty(profile.results) ? (
              <span>{profile.user.name} još nema rezultate...</span>
            ) : (
              <span>{profile.results}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
