import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Button from "../common/Button";
import { saveResult } from "../../actions/profileActions";

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
      maxPoints: maxPoints
    };
    console.log(newResult);
    this.props.saveResult(newResult, this.props.history);
  };
  render() {
    return (
      <div style={{ marginTop: `4em` }}>
        <p>Čestitamo na rezultatu!</p>
        <Button
          name="Završi test"
          onClick={this.onClick}
          className="btn btn-success btn-block"
        />
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
