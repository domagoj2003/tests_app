import React, { Component } from "react";
import { getSubjects } from "../../actions/testsActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { dataDisplay } from "../../validation/display-data";
import { getSections, selectSubject } from "../../actions/testsActions";
import ItemCard from "../common/ItemCard";
import Spinner from "../common/Spinner";

class Subjects extends Component {
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
    if (loading || subjects === null) {
      content = <Spinner />;
    } else if (subjects.length < 1) {
      content = <p className="lead">Za odabrani razred još nema testova.</p>;
    } else {
      content = subjects.map((subject, index) => (
        <ItemCard
          key={index}
          id={subject}
          item={dataDisplay(subject)}
          onClick={this.onClick}
          to={"/poglavlje"}
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
          <Link to="/razred" className="btn btn-light">
            Povratak
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
  { getSubjects, selectSubject, getSections }
)(Subjects);
