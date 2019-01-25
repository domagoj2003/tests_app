import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { selectGrade, clearSelections } from "../../actions/testsActions";
import ItemCard from "../common/ItemCard";

class HandleGrades extends Component {
  componentDidMount() {
    this.props.clearSelections();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected.selectedSection) {
      this.props.history.push("/ploca-upravljanje");
    }
  }
  onClick = e => {
    this.props.selectGrade(e.target.id);
  };

  render() {
    const { selectedGrade } = this.props.selected;
    let createNewSubject;
    if (selectedGrade) {
      createNewSubject = (
        <p>
          <Link to="/novi-predmet" className="btn btn-primary">
            Novi Predmet
          </Link>
        </p>
      );
    }
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
        to={`/ploca-predmeti`}
        onClick={this.onClick}
        cardStyle={{
          width: `14rem`,
          height: `14rem`,
          backgroundColor: `powderblue`
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
HandleGrades.propTypes = {
  tests: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  selectGrade: PropTypes.func.isRequired,
  clearSelections: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tests: state.tests,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { selectGrade, clearSelections }
)(HandleGrades);
