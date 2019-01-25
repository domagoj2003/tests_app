import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import QuestionList from "./QuestionList";
import { getQuestions } from "../../actions/testsActions";

class ActionBoard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-1">
            <Link to="/ploca-poglavlja" className="btn btn-light">
              Povratak
            </Link>
          </div>
          <div className="col-md-1 offset-9">
            <Link to="/novo-pitanje" className="btn btn-light">
              Kreiraj pitanje
            </Link>
          </div>
        </div>
        <div className="w-100" />
        <div className="col-md-12 text-center display-4">Pitanja</div>
        <QuestionList />
      </div>
    );
  }
}

ActionBoard.propTypes = {
  tests: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tests: state.tests,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { getQuestions }
)(ActionBoard);
