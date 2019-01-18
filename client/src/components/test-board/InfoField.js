import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { newQuestion } from "../../actions/testActions";
import Button from "../common/Button";
import CompleteTest from "./CompleteTest";

class InfoField extends Component {
  onClick = e => {
    const { questions } = this.props.test;
    this.props.newQuestion(questions);
  };
  render() {
    const {
      helpStatus,
      currentQuestion,
      answerStatus,
      questionsTotal,
      questionCounter
    } = this.props.test;

    const testEnd = questionsTotal === questionCounter;

    let content = (
      <div>
        {answerStatus && (
          <p className="lead" style={{ marginTop: `2em` }}>
            Odgovor je točan!
            <br />
          </p>
        )}
        {!answerStatus && (
          <p className="lead" style={{ marginTop: `2em` }}>
            Točan odgovor je - {currentQuestion.correctanswer}.<br />
          </p>
        )}
        {helpStatus && <p>Pomoć iskorištena</p>}
        <p className="lead" style={{ marginTop: `2em` }}>
          {currentQuestion.info}
        </p>
        {!testEnd && (
          <Button
            className="btn btn-info btn-block"
            name="Slijedeće pitanje"
            onClick={this.onClick}
          />
        )}
        {testEnd && <CompleteTest />}
      </div>
    );

    return <div>{content}</div>;
  }
}
const mapStateToProps = state => ({
  test: state.test
});

export default connect(
  mapStateToProps,
  { newQuestion }
)(InfoField);
