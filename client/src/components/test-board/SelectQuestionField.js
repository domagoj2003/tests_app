import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../common/Button";
import PropTypes from "prop-types";
import HelpField from "./HelpField";
import InfoField from "./InfoField";
import Path from "./Path";
import QuestionCount from "./QuestionCount";
import isCorrect from "../../validation/is-correct";
import {
  actionStatus,
  addPoints,
  answerStatus
} from "../../actions/testActions";
import { stat } from "fs";

class SelectQuestionField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.test.timer === 0) {
      this.setState({ answer: "" });
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.answer) {
      const { correctanswer } = this.props.test.currentQuestion;
      const { helpStatus } = this.props.test;
      const { answer } = this.state;
      this.props.actionStatus();
      const answerState = isCorrect(correctanswer, answer);
      this.props.answerStatus(answerState);
      let points = !answerState ? 0 : helpStatus ? 1 : 3;
      this.props.addPoints(points);
      this.setState({ answer: "" });
    }
  };

  render() {
    const {
      currentQuestion,
      timer,
      actionStatus,
      answerOptions
    } = this.props.test;
    const { selectedSubject, selectedSection } = this.props.selected;
    let timeRunOut = timer < 1 ? true : false;
    let content;
    let options = answerOptions.map((option, index) => (
      <div key={index} className="lead" style={{ margin: `1em` }}>
        <input
          className="form-check-input"
          type="radio"
          name="answer"
          id={index}
          value={option}
          onChange={this.onChange}
        />
        <label className="form-check-label" htmlFor={index}>
          {option}
        </label>
      </div>
    ));
    content =
      actionStatus && !timeRunOut ? (
        <div>
          <p className="lead" style={{ marginTop: `2em`, marginBottom: `2em` }}>
            {currentQuestion.question}
          </p>
          <form onSubmit={this.onSubmit} className="form-check">
            {options}
            <Button
              className="btn btn-success btn-block"
              name="Odgovori"
              type="submit"
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
        <Path subject={selectedSubject} section={selectedSection} />
        <QuestionCount />
        {content}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  test: state.test,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { actionStatus, addPoints, answerStatus }
)(SelectQuestionField);
