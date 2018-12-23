import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getSubjects,
  selectGrade,
  clearSelections
} from "../../actions/testActions";
import Grades from "../common/Grades";
import Subjects from "../common/Subjects";
import Sections from "./Sections";

class SelectBoard extends Component {
  componentDidMount() {
    this.props.clearSelections();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected.selectedSection) {
      this.props.history.push("/ploca-upravljanje");
    }
  }

  onClick = e => {
    this.props.getSubjects(e.target.id);
    this.props.selectGrade(e.target.id);
  };
  render() {
    const { selectedGrade } = this.props.selected;
    let createNewSubject;
    if (selectedGrade) {
      createNewSubject = (
        <p>
          <Link to="/novi-predmet" className="btn btn-link">
            Novi Predmet
          </Link>
        </p>
      );
    }
    const grades = [
      { name: "5. Razed", id: "peti" },
      { name: "6. Razed", id: "sesti" },
      { name: "7. Razed", id: "sedmi" },
      { name: "8. Razed", id: "osmi" }
    ];
    return (
      <div className="container">
        <div className="card card-body bg-light">
          <div className="row">
            <div className="col-md-12 offset-md-5">{createNewSubject}</div>
          </div>
          <div className="row">
            <Grades onClick={this.onClick} grades={grades} />
            <Subjects />
            <Sections />
          </div>
        </div>
      </div>
    );
  }
}
SelectBoard.propTypes = {
  tests: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  getSubjects: PropTypes.func.isRequired,
  selectGrade: PropTypes.func.isRequired,
  clearSelections: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tests: state.tests,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { getSubjects, selectGrade, clearSelections }
)(SelectBoard);
