import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "./Button";
import { selectSubject, getSections } from "../../actions/testsActions";

class Subjects extends Component {
  onClick = e => {
    const { selectedGrade } = this.props.selected;
    const subject = e.target.id;
    this.props.getSections(selectedGrade, subject);
    this.props.selectSubject(subject);
  };

  render() {
    const { subjects, loading } = this.props.tests;
    let content;
    if (loading) {
      content = <p>loading data...</p>;
    } else if (subjects === null) {
      content = null;
    } else {
      content = subjects.map((item, index) => (
        <div key={index}>
          <p>
            <Button
              id={item}
              name={item}
              onClick={this.onClick}
              className="btn btn-link"
            />
          </p>
        </div>
      ));
    }
    return <div className="col-md-4 text-center">{content}</div>;
  }
}
Subjects.propTypes = {
  tests: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  getSections: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
  tests: state.tests,
  selected: state.selected
});

export default connect(
  mapStatetoProps,
  { selectSubject, getSections }
)(Subjects);
