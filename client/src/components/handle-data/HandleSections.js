import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemCard from "../common/ItemCard";
import Spinner from "../common/Spinner";
import { dataDisplay } from "../../validation/display-data";
import { getSections, selectSection } from "../../actions/testsActions";

class HandleSections extends Component {
  componentDidMount() {
    const { selectedGrade, selectedSubject } = this.props.selected;
    this.props.getSections(selectedGrade, selectedSubject);
  }

  onClick = e => {
    const section = e.target.id;
    this.props.selectSection(section);
  };

  render() {
    const { sections, loading } = this.props.tests;
    let content;
    if (loading || sections === null) {
      content = <Spinner />;
    } else if (sections.length < 1) {
      content = (
        <div>
          <p>Za odabrani predmet nema testova</p>
          <p>
            <Link to="/novo-pitanje" className="btn btn-light offset-3">
              Kreiraj pitanje
            </Link>
          </p>
        </div>
      );
    } else {
      content = sections.map((section, index) => (
        <ItemCard
          key={index}
          id={section}
          item={dataDisplay(section)}
          onClick={this.onClick}
          to={"/ploca-upravljanje"}
          style={{ fontSize: `2rem`, textAlign: `center` }}
        />
      ));
    }
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-12 text-center display-4 mb-5 mt-5">
          Odaberi cjelinu:
        </div>
        {content}
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
  { getSections, selectSection }
)(HandleSections);
