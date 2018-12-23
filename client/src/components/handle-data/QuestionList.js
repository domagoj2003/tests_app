import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteQuestion } from "../../actions/testActions";
import Button from "../common/Button";
import CollapseField from "../common/CollapseField";

class QuestionList extends Component {
  onClickDelete = e => {
    const { selectedGrade, selectedSubject } = this.props.selected;
    const questionId = e.target.id;
    this.props.deleteQuestion(selectedGrade, selectedSubject, questionId);
  };
  onClickLog = e => {
    console.log(e.target.id);
  };
  render() {
    const { questions, loading } = this.props.tests;
    let content;
    if (loading || questions === null) {
      content = null;
    } else {
      content = questions.map((item, index) => (
        <div key={item._id}>
          <div className="row" style={{ marginTop: `1em` }}>
            <div className="col-md-1">{index + 1}</div>
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
              <Button
                id={item._id}
                className="btn btn-warning"
                name="Uredi"
                onClick={this.onClickLog}
              />
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
            help="Pomoć: "
            info="Info: "
          />
        </div>
      ));
    }
    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({
  tests: state.tests,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { deleteQuestion }
)(QuestionList);
