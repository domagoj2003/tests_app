import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import Button from "../common/Button";
import { saveResult } from "../../actions/resultsActions";

class CompleteTest extends Component {
  onClick = e => {
    const {
      selectedGrade,
      selectedSubject,
      selectedSection
    } = this.props.selected;
    const { points, maxPoints } = this.props.test;
    const newResult = {
      grade: selectedGrade,
      subject: selectedSubject,
      section: selectedSection,
      points: points,
      maxPoints: maxPoints,
      percentage: Math.round((points / maxPoints) * 100)
    };
    this.props.saveResult(newResult, this.props.history);
  };
  render() {
    return (
      <div style={{ marginTop: `4em` }}>
        <p>Kraj testa.</p>
        <Button
          name="Spremi rezultat"
          onClick={this.onClick}
          className="btn btn-success btn-block"
        />
        <Link to="/razred" className="btn btn-info btn-block">
          Povratak
        </Link>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  selected: state.selected,
  test: state.test
});

export default connect(
  mapStateToProps,
  { saveResult }
)(withRouter(CompleteTest));
