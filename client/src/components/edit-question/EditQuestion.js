import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import InputField from "../common/InputField";
import TextArea from "../common/TextArea";
import { editQuestion } from "../../actions/testsActions";

class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "",
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

  componentDidMount() {
    const { selectedQuestion } = this.props.selected;
    this.setState({
      section: selectedQuestion.section,
      question: selectedQuestion.question,
      correctanswer: selectedQuestion.correctanswer,
      help: selectedQuestion.help,
      info: selectedQuestion.info
    });
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const {
      selectedGrade,
      selectedSubject,
      selectedQuestion
    } = this.props.selected;
    const editData = {
      section: this.state.section,
      question: this.state.question,
      correctanswer: this.state.correctanswer,
      help: this.state.help,
      info: this.state.info
    };
    this.props.editQuestion(
      selectedGrade,
      selectedSubject,
      selectedQuestion._id,
      editData,
      this.props.history
    );
  };

  render() {
    const { errors } = this.state;
    const { selectedSection } = this.props.selected;
    return (
      <div className="create-question">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/ploca-upravljanje" className="btn btn-light">
              Povratak
            </Link>
            <h1 className="display-4 text-center">Uredi detalje</h1>
            <small className="d-block pb-3">* obvezna polja</small>
            <form onSubmit={this.onSubmit}>
              <InputField
                name="section"
                value={selectedSection}
                errors={errors.section}
                onChange={this.onChange}
                disabled={true}
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
                Uredi pitanje
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  selected: state.selected,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editQuestion }
)(withRouter(EditQuestion));
