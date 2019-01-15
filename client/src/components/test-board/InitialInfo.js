import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import PropTypes from "prop-types";
import { dataDisplay } from "../../validation/display-data";
import { setTotalQuestions, newQuestion } from "../../actions/testActions";

class InitialInfo extends Component {
  onClick = e => {
    const { questions } = this.props.test;
    this.props.setTotalQuestions(questions.length);
    this.props.newQuestion(questions);
  };
  render() {
    const { questions, loading, timer } = this.props.test;
    const { selectedSubject, selectedSection } = this.props.selected;
    const points = 3;
    return (
      <div>
        <p className="lead">
          {dataDisplay(selectedSubject)} / {dataDisplay(selectedSection)}
        </p>
        <p>
          <Link to="/poglavlje" className="btn btn-light">
            Povratak
          </Link>
        </p>
        <div style={{ marginBottom: `2rem` }}>
          <div className="col-12 text-center">
            <p className="lead">Pravila:</p>
          </div>

          {!loading && (
            <div>
              <div className="col-12 offset-1">
                - Test se sastoji od ukupno {questions.length} pitanja
              </div>
              <div className="col-12 offset-1">
                - Svaki točan odgovor ti donosi 3 boda.
              </div>

              <div className="col-12 offset-1">
                - Za odgovor imaš točno {timer} sekundi.
              </div>
              <div className="col-12 offset-1">
                - Ukoliko iskoristiš Pomoć, točan odgovor ti nosi 1 bod.
              </div>
              <div className="col-12 offset-1">
                - Najveći mogući broj bodova je {questions.length * points}.
              </div>
            </div>
          )}
        </div>
        <Button
          name="ajde"
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
  { setTotalQuestions, newQuestion }
)(InitialInfo);
