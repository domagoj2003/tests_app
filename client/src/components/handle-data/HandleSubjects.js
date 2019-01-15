import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSubjects, selectSubject } from "../../actions/testsActions";
import { dataDisplay } from "../../validation/display-data";
import Spinner from "../common/Spinner";
import ItemCard from "../common/ItemCard";

class HandleSubjects extends Component {
  componentDidMount() {
    this.props.getSubjects(this.props.selected.selectedGrade);
  }

  onClick = e => {
    const subject = e.target.id;
    this.props.selectSubject(subject);
  };

  render() {
    const { subjects, loading } = this.props.tests;
    let content;
    if ((loading, subjects === null)) {
      content = <Spinner />;
    } else if (subjects.length < 1) {
      content = <h1>Za odabrani razred nema sadržaja</h1>;
    } else {
      content = subjects.map((subject, index) => (
        <ItemCard
          key={index}
          id={subject}
          item={dataDisplay(subject)}
          onClick={this.onClick}
          to={"/ploca-poglavlja"}
          style={{ fontSize: `2rem`, textAlign: `center` }}
        />
      ));
    }
    return (
      <div>
        <p>
          <Link to="/ploca" className="btn btn-light">
            Povratak
          </Link>
          <Link to="/novi-predmet" className="btn btn-light offset-9">
            Kreiraj predmet
          </Link>
        </p>
        <div className="row justify-content-md-center">
          <div className="col-md-12 text-center display-4 mb-5 mt-5">
            Odaberi predmet:
          </div>
          {content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tests: state.tests,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { getSubjects, selectSubject }
)(HandleSubjects);
