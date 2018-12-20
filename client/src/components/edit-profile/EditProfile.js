import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";
import TextArea from "../common/TextArea";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      city: "",
      grade: "",
      bio: "",
      errors: {}
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        school: profile.school,
        city: profile.city,
        grade: profile.grade,
        bio: profile.bio
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
    const profileData = {
      school: this.state.school,
      city: this.state.city,
      grade: this.state.grade,
      bio: this.state.bio
    };
    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    const options = [
      { label: "* Odaberi razred koji pohađaš", value: 0 },
      { label: "Prvi", value: "Prvi" },
      { label: "Drugi", value: "Drugi" },
      { label: "Treći", value: "Treći" },
      { label: "Četvrti", value: "Četvrti" },
      { label: "Peti", value: "Peti" },
      { label: "Šesti", value: "Šesti" },
      { label: "Sedmi", value: "Sedmi" },
      { label: "Osmi", value: "Osmi" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/profil" className="btn btn-light">
                Povratak
              </Link>
              <h1 className="display-4 text-center">Uredi profil</h1>
              <small className="d-block pb-3">* obvezna polja</small>
              <form onSubmit={this.onSubmit}>
                <InputField
                  placeholder="* Škola"
                  name="school"
                  value={this.state.school}
                  errors={errors.school}
                  onChange={this.onChange}
                  info="Navedi školu koju pohađaš"
                />
                <InputField
                  placeholder="* Grad"
                  name="city"
                  value={this.state.city}
                  errors={errors.city}
                  onChange={this.onChange}
                  info="Iz kojeg grada ili mjesta dolaziš? Ukolio želiš navedi i kvart.."
                />
                <SelectField
                  name="grade"
                  value={this.state.grade}
                  options={options}
                  placeholder="razred"
                  onChange={this.onChange}
                  errors={this.errors}
                />
                <TextArea
                  placeholder="* Napiši nešto o sebi..."
                  name="bio"
                  value={this.state.bio}
                  errors={errors.bio}
                  onChange={this.onChange}
                  info="Slobodne aktivnosti, omiljeni predmet, hobi, sve što ti padne na pamet..."
                />
                <button className="btn btn-info btn-block mt-4">
                  Uredi Profil
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(EditProfile);
