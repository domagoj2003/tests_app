import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../common/Button";
import { selectSection, getQuestions } from "../../actions/testActions";

class Sections extends Component {
  onClick = e => {
    const { selectedGrade, selectedSubject } = this.props.selected;
    const section = e.target.id;
    this.props.selectSection(section);
    this.props.getQuestions(selectedGrade, selectedSubject, section);
  };
  render() {
    const { loading, sections } = this.props.tests;
    let content;
    if (loading) {
      content = <div>Loading...</div>;
    } else if (sections === null) {
      content = null;
    } else {
      content = sections.map((item, index) => (
        <Button key={index} name={item} id={item} onClick={this.onClick} />
      ));
    }
    return <div className="col-md-4 text-center">{content}</div>;
  }
}
Sections.propTypes = {
  tests: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  selectSection: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tests: state.tests,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { selectSection, getQuestions }
)(Sections);
