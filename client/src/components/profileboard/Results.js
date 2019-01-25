import React, { Component } from "react";
import PropTypes from "prop-types";

import ResultList from "./ResultList";

class Results extends Component {
  render() {
    const { results, profile, onClick } = this.props;
    let content;
    const data = results.filter(res => res.user._id === profile.user._id);
    if (data.length > 0) {
      content = <ResultList results={data} onClick={onClick} />;
    } else {
      content = <p className="lead text-center">Još nemaš rezultata.</p>;
    }

    return (
      <div>
        <h3 className="text-center text-info">Rezultati</h3>
        {content}
      </div>
    );
  }
}

export default Results;
