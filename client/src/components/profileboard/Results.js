import React from "react";
import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";

const Results = ({ results, user }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">Rezultati</h3>

          {isEmpty(results) ? (
            <span>{user.name} još nema rezultate...</span>
          ) : (
            results.map(result => (
              <div
                className="row"
                key={result._id}
                style={{ marginTop: `1em` }}
              >
                <div className="col-2">{result.grade}. razred</div>
                <div className="col-2">{result.subject}</div>
                <div className="col">{result.section}</div>
                <div className="col-1">
                  {Math.round((result.points / result.maxpoints) * 100)} %
                </div>
                <div className="col">
                  <Moment format="DD.MM.YYYY - HH:mm">{result.date}</Moment>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
