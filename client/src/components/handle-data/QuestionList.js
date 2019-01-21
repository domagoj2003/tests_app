import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteQuestion } from "../../actions/testsActions";
import Button from "../common/Button";
import CollapseField from "../common/CollapseField";
import {
  editQuestion,
  getQuestions,
  selectQuestion
} from "../../actions/testsActions";
import Spinner from "../common/Spinner";

class QuestionList extends Component {
  componentDidMount() {
    const {
      selectedGrade,
      selectedSubject,
      selectedSection
    } = this.props.selected;
    this.props.getQuestions(selectedGrade, selectedSubject, selectedSection);
  }

  onClickDelete = e => {
    const { selectedGrade, selectedSubject } = this.props.selected;
    const questionId = e.target.id;
    this.props.deleteQuestion(selectedGrade, selectedSubject, questionId);
  };

  onClickSelect = e => {
    const questionId = e.target.id;
    const { questions } = this.props.tests;
    const selectedQuestion = questions.find(
      element => element._id === questionId
    );
    this.props.selectQuestion(selectedQuestion);
  };
  render() {
    const { questions, loading } = this.props.tests;
    let content;
    if (loading || questions === null) {
      content = (
        <div className="row justify-content-md-center">
          <Spinner />
        </div>
      );
    } else if (questions.length < 1) {
      content = (
        <h2 className="row justify-content-md-center">
          Za odabranu cjelinu ne postoje pitanja.
        </h2>
      );
    } else {
      content = questions.map((item, index) => (
        <div key={item._id}>
          <div className="row" style={{ marginTop: `1em` }}>
            <div className="col-md-1">{index + 1}.</div>
            <div className="col"> {item.question}</div>
            <div className="col-md-1">
              <Button
                className="btn btn-info"
                type="button"
                name="Detalji"
                data_toggle="collapse"
                data_target={`#Id${item._id}`}
                aria_expanded="false"
                aria_controls={item._id}
              />
            </div>
            <div className="col-md-1">
              <Link to="/uredi-pitanje">
                <Button
                  name="uredi"
                  className="btn btn-warning"
                  onClick={this.onClickSelect}
                  id={item._id}
                />
              </Link>
            </div>
            <div className="col-md-1">
              <Button
                id={item._id}
                className="btn btn-danger"
                name="Izbriši"
                onClick={this.onClickDelete}
              />
            </div>
          </div>
          <div style={{ paddingTop: `1em` }} />
          <CollapseField
            data={item}
            question="Pitanje: "
            answer="Odgovor: "
            options="Opcije: "
            help="Pomoć: "
            info="Info: "
          />
        </div>
      ));
    }
    return <div style={{ marginTop: `2em` }}>{content}</div>;
  }
}

const mapStateToProps = state => ({
  tests: state.tests,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { deleteQuestion, editQuestion, getQuestions, selectQuestion }
)(QuestionList);
