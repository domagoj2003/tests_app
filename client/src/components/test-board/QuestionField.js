import React, { Component } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { connect } from "react-redux";
import QuestionCount from "./QuestionCount";
import InfoField from "./InfoField";
import HelpField from "./HelpField";
import PropTypes from "prop-types";
import isCorrect from "../../validation/is-correct";
import {
  answerStatus,
  addPoints,
  newQuestion,
  questionCounter,
  actionStatus
} from "../../actions/testActions";

class QuestionField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { correctanswer } = this.props.test.currentQuestion;
    const { helpStatus } = this.props.test;
    const { answer } = this.state;
    this.props.actionStatus();
    const answerState = isCorrect(correctanswer, answer);
    this.props.answerStatus(answerState);
    let points = !answerState ? 0 : helpStatus ? 10 : 20;
    this.props.addPoints(points);
    this.setState({ answer: "" });
  };

  render() {
    const { currentQuestion, actionStatus } = this.props.test;
    let timeRunOut = this.props.test.timer < 1 ? true : false;
    let content;
    content =
      actionStatus && !timeRunOut ? (
        <div>
          <p className="lead" style={{ marginTop: `2em`, marginBottom: `2em` }}>
            {currentQuestion.question}
          </p>
          <form onSubmit={this.onSubmit}>
            <InputField
              name="answer"
              placeholder="tvoj odgovor..."
              value={this.state.answer}
              onChange={this.onChange}
              disabled={timeRunOut}
            />
            <Button
              className="btn btn-success btn-block"
              name="Odgovori"
              type="submit"
              disabled={timeRunOut}
            />
          </form>
          <HelpField />
        </div>
      ) : (
        <div>
          <InfoField />
        </div>
      );
    return (
      <div>
        <QuestionCount />
        {content}
      </div>
    );
  }
}

QuestionField.propTypes = {
  test: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  answerStatus: PropTypes.func.isRequired,
  addPoints: PropTypes.func.isRequired,
  newQuestion: PropTypes.func.isRequired,
  questionCounter: PropTypes.func.isRequired,
  actionStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  test: state.test,
  selected: state.selected
});
export default connect(
  mapStateToProps,
  { answerStatus, addPoints, newQuestion, questionCounter, actionStatus }
)(QuestionField);
