import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSubjects, selectGrade } from "../../actions/testActions";
import Grades from "./Grades";
import Subjects from "./Subjects";
import Sections from "./Sections";

class Examboard extends Component {
  onClick = e => {
    this.props.getSubjects(e.target.id);
    this.props.selectGrade(e.target.id);
  };

  render() {
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
            <Grades onClick={this.onClick} grades={grades} />
            <Subjects />
            <Sections />
          </div>
        </div>
      </div>
    );
  }
}
Examboard.propTypes = {
  tests: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  getSubjects: PropTypes.func.isRequired,
  selectGrade: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tests: state.tests,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { getSubjects, selectGrade }
)(Examboard);
