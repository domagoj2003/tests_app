import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SelectField from "../common/SelectField";
import Spinner from "../common/Spinner";
import { getResults } from "../../actions/resultsActions";
import { getUserProfiles } from "../../actions/profileActions";
import {
  results_sort_desc,
  date_sort_desc,
  resultsDisplay
} from "../../validation/display-data";
import ResultsList from "./ResultsList";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "A"
    };
  }
  componentDidMount() {
    this.props.getResults();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onClick = e => {
    e.preventDefault();
    const userId = e.target.id;
    this.props.getUserProfiles(userId);
    console.log(userId);
  };

  render() {
    const options = [
      { label: "Rangiraj prema uspjehu", value: "A" },
      { label: "Rangiraj prema datumu", value: "B" }
    ];
    const { resultList, loading } = this.props.results;
    let content;
    if (loading) {
      content = undefined;
    } else if (this.state.order === "A") {
      content = resultsDisplay(resultList.sort(results_sort_desc));
    } else {
      content = resultList.sort(date_sort_desc);
    }

    return (
      <div>
        <p className="col-md-12 text-center display-4 mb-5 mt-5">Rezultati</p>
        <SelectField
          name="order"
          value={this.state.order}
          options={options}
          onChange={this.onChange}
        />
        {!loading && <ResultsList results={content} onClick={this.onClick} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.results
});

export default connect(
  mapStateToProps,
  { getResults, getUserProfiles }
)(Results);
