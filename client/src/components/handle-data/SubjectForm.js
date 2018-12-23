import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { createSubject } from "../../actions/testActions";
import InputField from "../common/InputField";

class SubjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
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
    const grade = this.props.selected.selectedGrade;
    const subjectData = {
      subject: this.state.subject
    };
    this.props.createSubject(grade, subjectData);
  };

  render() {
    const { errors } = this.state;
    const { selectedGrade } = this.props.selected;
    return (
      <div className="create-subject">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/ploca" className="btn btn-light">
              Povratak
            </Link>
            <h1 className="display-4 text-center">Novi Predmet</h1>
            <small className="d-block pb-3">* obvezna polja</small>
            <form onSubmit={this.onSubmit}>
              <InputField
                name="grade"
                value={selectedGrade}
                errors={errors.section}
                onChange={this.onChange}
                disabled="disabled"
                info="Razred za koji kreiraš predmet"
              />
              <InputField
                name="subject"
                value={this.state.subject}
                errors={errors.subject}
                onChange={this.onChange}
              />
              <button className="btn btn-info btn-block mt-4">
                Kreiraj Predmet
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SubjectForm.propTypes = {
  tests: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  createSubject: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  tests: state.tests,
  selected: state.selected
});

export default connect(
  mapStateToProps,
  { createSubject }
)(SubjectForm);
