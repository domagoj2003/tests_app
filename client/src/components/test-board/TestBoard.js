import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Points from "./Points";
import Timer from "./Timer";
import QuestionField from "./QuestionField";
import SelectQuestionField from "./SelectQuestionField";
import HelpButton from "./HelpButton";

import InitialInfo from "./InitialInfo";

import { resetTest, actionStatus } from "../../actions/testActions";

class TestBoard extends Component {
  componentWillMount() {
    if (this.props.tests.sections === null) {
      this.props.history.push("/razred");
    }
  }
  componentWillUnmount() {
    this.props.resetTest();
  }

  render() {
    const { actionStatus, currentQuestion } = this.props.test;
    let content;
    if (actionStatus === undefined) {
      content = <InitialInfo />;
    } else {
      content = (
        <div className="row">
          <div className="col-md-2">
            <div className="row">
              <Points />
              <Timer />
            </div>
          </div>
          {currentQuestion.sort === "A" && (
            <div className="col-lg-8">
              <QuestionField />
            </div>
          )}
          {currentQuestion.sort === "B" && (
            <div className="col-lg-8">
              <SelectQuestionField />
            </div>
          )}
          <div className="col-md-2">
            <div className="row">
              <HelpButton />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="test">
        <div className="card card-body bg-light mb-3">{content}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test,
  tests: state.tests
});

export default connect(
  mapStateToProps,
  {
    resetTest,
    actionStatus
  }
)(TestBoard);
