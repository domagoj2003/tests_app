import React, { Component } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isCorrect from "../../validation/is-correct";
import { answerStatus, addPoints } from "../../actions/testActions";

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
    const answerState = isCorrect(correctanswer, answer);
    this.props.answerStatus(answerState);
    let points = !answerState ? 0 : helpStatus ? 10 : 20;
    this.props.addPoints(points);
  };

  render() {
    const { question } = this.props.test.currentQuestion;
    return (
      <div>
        <h4> Pitanje: 1 / 10</h4>
        <p className="lead" style={{ marginTop: `2em` }}>
          {question}
        </p>
        <form onSubmit={this.onSubmit}>
          <InputField
            name="answer"
            placeholder="tvoj odgovor..."
            value={this.state.answer}
            onChange={this.onChange}
          />
          <Button className="btn btn-success" name="Odgovori" type="submit" />
        </form>
      </div>
    );
  }
}

QuestionField.propTypes = {
  test: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  answerStatus: PropTypes.func.isRequired,
  addPoints: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  test: state.test,
  selected: state.selected
});
export default connect(
  mapStateToProps,
  { answerStatus, addPoints }
)(QuestionField);
