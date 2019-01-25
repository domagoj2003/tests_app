import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { dataDisplay } from "../../validation/display-data";
import { getSections, selectSection } from "../../actions/testsActions";
import { getTestQuestions } from "../../actions/testActions";
import ItemCard from "../common/ItemCard";

class Sections extends Component {
  componentDidMount() {
    const { selectedGrade, selectedSubject } = this.props.selected;
    this.props.getSections(selectedGrade, selectedSubject);
  }

  onClick = e => {
    const { selectedGrade, selectedSubject } = this.props.selected;
    const section = e.target.id;
    this.props.selectSection(section);
    this.props.getTestQuestions(
      selectedGrade,
      selectedSubject,
      section,
      this.props.history
    );
  };

  render() {
    const { sections, loading } = this.props.tests;
    let content;
    if (loading || sections === null) {
      content = <div>Loading...</div>;
    } else if (sections.length < 1) {
      content = <p className="lead">Za odabrani predmet nema ispita</p>;
    } else {
      content = sections.map((section, index) => (
        <ItemCard
          key={index}
          item={dataDisplay(section)}
          id={section}
          onClick={this.onClick}
          to={`/test`}
          textStyle={{
            fontSize: `1.5rem`,
            textAlign: `center`
          }}
          cardStyle={{
            width: `50%`,
            height: `2.5rem`,
            backgroundColor: `mintcream`
          }}
        />
      ));
    }
    return (
      <div>
        <p>
          <Link to="/predmeti" className="btn btn-light">
            Povratak
          </Link>
        </p>
        <div className="row justify-content-md-center">
          <div className="col-md-12 text-center display-4 mb-5 mt-5">
            Odaberi cjelinu:
          </div>
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.selected,
  tests: state.tests
});

export default connect(
  mapStateToProps,
  { getSections, selectSection, getTestQuestions }
)(withRouter(Sections));
