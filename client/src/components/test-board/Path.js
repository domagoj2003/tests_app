import React from "react";
import { dataDisplay } from "../../validation/display-data";

const Path = ({ subject, section }) => {
  return (
    <p className="lead">
      {dataDisplay(subject)} / {dataDisplay(section)}
    </p>
  );
};

export default Path;
