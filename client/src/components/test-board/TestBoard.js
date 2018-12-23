import React, { Component } from "react";
import { connect } from "react-redux";
import Points from "./Points";
import Timer from "./Timer";
import QuestionField from "./QuestionField";
import HelpButton from "./HelpButton";
import CancelButton from "./CancelButton";
import Button from "../common/Button";
import {
  newQuestion,
  clearFields,
  actionStatus
} from "../../actions/testActions";
import HelpField from "./HelpField";

class TestBoard extends Component {
  componentWillMount() {
    if (this.props.tests.sections === null) {
      this.props.history.push("/testovi");
    }
  }
  componentWillUnmount() {
    this.props.clearFields();
  }
  onClick = e => {
    const questions = this.props.test.questions;
    this.props.newQuestion(questions);
    this.props.actionStatus();
  };
  render() {
    const { actionStatus } = this.props.test;
    let content;
    if (!actionStatus) {
      content = (
        <Button
          name="Počni test"
          onClick={this.onClick}
          className="btn btn-info"
        />
      );
    } else {
      content = (
        <div className="row">
          <div className="col-md-2">
            <div className="row">
              <Points />
              <Timer />
            </div>
          </div>
          <div className="col-lg-8">
            <QuestionField />
          </div>
          <div className="col-md-2">
            <div className="row">
              <HelpButton />
              <CancelButton />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="test">
        <div className="card card-body bg-light mb-3">
          {content}
          <HelpField />
        </div>
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
  { newQuestion, clearFields, actionStatus }
)(TestBoard);
