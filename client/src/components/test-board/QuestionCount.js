import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class QuestionCount extends Component {
  render() {
    const { questionCounter, questionsTotal } = this.props.test;
    return (
      <div>
        <h4>
          Pitanje:{" "}
          <span>
            {questionCounter} / {questionsTotal}
          </span>
        </h4>
      </div>
    );
  }
}

QuestionCount.propTypes = {
  test: PropTypes.object.isRequired
};
const mapStatToProps = state => ({
  test: state.test
});

export default connect(mapStatToProps)(QuestionCount);
