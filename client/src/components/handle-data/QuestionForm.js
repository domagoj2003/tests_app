import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextArea from "../common/TextArea";
import InputField from "../common/InputField";
import { createQuestion } from "../../actions/testActions";

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: this.props.selected.selectedSection,
      question: "",
      correctanswer: "",
      help: "",
      info: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const { selectedGrade, selectedSubject } = this.props.selected;
    const questionData = {
      section: this.state.section,
      question: this.state.question,
      correctanswer: this.state.correctanswer,
      help: this.state.help,
      info: this.state.info
    };
    this.props.createQuestion(selectedGrade, selectedSubject, questionData);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="create-question">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/ploca-upravljanje" className="btn btn-light">
              Povratak
            </Link>
            <h1 className="display-4 text-center">Novo pitanje</h1>
            <small className="d-block pb-3">* obvezna polja</small>
            <form onSubmit={this.onSubmit}>
              <InputField
                name="section"
                value={this.state.section}
                errors={errors.section}
                onChange={this.onChange}
                disabled="disabled"
              />
              <TextArea
                name="question"
                value={this.state.question}
                errors={errors.question}
                placeholder="Pitanje"
                onChange={this.onChange}
              />
              <TextArea
                name="correctanswer"
                value={this.state.correctanswer}
                errors={errors.correctanswer}
                placeholder="Odgovor"
                onChange={this.onChange}
              />
              <TextArea
                name="help"
                value={this.state.help}
                errors={errors.help}
                placeholder="Pomoć"
                onChange={this.onChange}
              />
              <TextArea
                name="info"
                value={this.state.info}
                errors={errors.info}
                placeholder="Dodatne informacije"
                onChange={this.onChange}
              />
              <button className="btn btn-info btn-block mt-4">
                Kreiraj pitanje
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

QuestionForm.propTypes = {
  selected: PropTypes.object.isRequired,
  createQuestion: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  selected: state.selected,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createQuestion }
)(QuestionForm);
