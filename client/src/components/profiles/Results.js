import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  results_sort_desc,
  date_sort_desc
} from "../../validation/display-data";
import SelectField from "../common/SelectField";
import ResultsList from "./ResultsList";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "A"
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { results, profile } = this.props;
    const options = [
      { label: "Rangiraj prema uspjehu", value: "A" },
      { label: "Rangiraj prema datumu", value: "B" }
    ];
    let content = results;
    if (this.state.order === "A") {
      content = content.sort(results_sort_desc);
    } else if (this.state.order === "B") {
      content = content.sort(date_sort_desc);
    }
    return (
      <div>
        <h3 className="text-center text-info">Rezultati</h3>
        <SelectField
          name="order"
          value={this.state.order}
          options={options}
          onChange={this.onChange}
        />
        <ResultsList results={content} profile={profile} />
      </div>
    );
  }
}

export default Results;
