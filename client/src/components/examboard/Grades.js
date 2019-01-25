import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getSubjects,
  selectGrade,
  clearSelections
} from "../../actions/testsActions";

import ItemCard from "../common/ItemCard";

class Grades extends Component {
  componentDidMount() {
    this.props.clearSelections();
  }
  onClick = e => {
    this.props.selectGrade(e.target.id);
  };

  render() {
    const grades = [
      { name: "5.", id: "peti" },
      { name: "6.", id: "sesti" },
      { name: "7.", id: "sedmi" },
      { name: "8.", id: "osmi" }
    ];
    const content = grades.map((grade, index) => (
      <ItemCard
        key={index}
        id={grade.id}
        item={grade.name}
        to={`/predmeti`}
        onClick={this.onClick}
        cardStyle={{
          width: `14rem`,
          height: `14rem`,
          backgroundColor: `mintcream`
        }}
        textStyle={{
          fontSize: `7rem`,
          textAlign: `center`
        }}
      />
    ));

    return (
      <div className="row justify-content-md-center">
        <div className="col-md-12 text-center display-4 mb-5 mt-5">
          Odaberi razred:
        </div>
        {content}
      </div>
    );
  }
}
Grades.propTypes = {
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
)(Grades);
