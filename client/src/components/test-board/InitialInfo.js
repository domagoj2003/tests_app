import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Path from "./Path";
import PropTypes from "prop-types";
import {
  setTotalQuestions,
  newQuestion,
  setMaxPoints
} from "../../actions/testActions";

class InitialInfo extends Component {
  onClick = e => {
    const { questions } = this.props.test;
    this.props.setTotalQuestions(questions.length);
    this.props.setMaxPoints(questions.length * 3);
    this.props.newQuestion(questions);
  };
  render() {
    const { questions, loading, timer } = this.props.test;
    const { selectedSubject, selectedSection } = this.props.selected;
    return (
      <div>
        <Path subject={selectedSubject} section={selectedSection} />
        <p>
          <Link to="/poglavlje" className="btn btn-light">
            Povratak
          </Link>
        </p>
        <div style={{ marginBottom: `2rem` }}>
          {!loading && (
            <div>
              <div
                className="col-12 lead"
                style={{ marginLeft: `3em`, marginBottom: `0.5em` }}
              >
                {questions.length} pitanja
              </div>
              <div
                className="col-12 lead"
                style={{ marginLeft: `3em`, marginBottom: `0.5em` }}
              >
                Točan odgovor - 3 boda.
              </div>
              <div
                className="col-12 lead"
                style={{ marginLeft: `3em`, marginBottom: `0.5em` }}
              >
                Netočan odgovor - 0 bodova.
              </div>
              <div
                className="col-12 lead"
                style={{ marginLeft: `3em`, marginBottom: `0.5em` }}
              >
                Ukoliko zapneš, probaj iskoristit Pomoć. Nemaju sva pitanja
                Pomoć.
              </div>
              <div
                className="col-12 lead"
                style={{ marginLeft: `3em`, marginBottom: `0.5em` }}
              >
                Uz iskorištenu pomoć, točan odgovor nosi 1 bod.
              </div>
              <div
                className="col-12 lead"
                style={{ marginLeft: `3em`, marginBottom: `0.5em` }}
              >
                Pazi na vrijeme! Za odgovor imaš {timer} sekundi.
              </div>
            </div>
          )}
        </div>
        <Button
          name="Započni test"
          onClick={this.onClick}
          className="btn btn-info btn-block"
        />
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
  { setTotalQuestions, newQuestion, setMaxPoints }
)(InitialInfo);
