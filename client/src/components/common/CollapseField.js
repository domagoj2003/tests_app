import React from "react";

const CollapseField = ({
  data,
  question,
  answer,
  help,
  options,
  info,
  style
}) => (
  <div className="collapse" id={`Id${data._id}`}>
    <div className="card card-body bg-light">
      <div className="row">
        <div className="col-md-2">Tip pitanja:</div>
        <div className="col">{data.sort}</div>
      </div>
      <div className="row">
        <div className="col-md-2">{question}</div>
        <div className="col">{data.question}</div>
      </div>
      <div className="row">
        <div className="col-md-2">{answer}</div>
        <div className="col">{data.correctanswer}</div>
      </div>
      {data.options && (
        <div className="row">
          <div className="col-md-2">{options}</div>
          <div className="col">{data.options}</div>
        </div>
      )}
      <div className="row">
        <div className="col-md-2">{help}</div>
        <div className="col">{data.help}</div>
      </div>
      <div className="row">
        <div className="col-md-2">{info}</div>
        <div className="col">{data.info}</div>
      </div>
    </div>
  </div>
);

export default CollapseField;
