import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputField from "../common/InputField";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(userData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Registriraj se</h1>
              <p className="lead text-center">Kreiraj svoj korisnički račun</p>
              <form onSubmit={this.onSubmit}>
                <InputField
                  placeholder="Korisničko ime"
                  name="name"
                  value={this.state.name}
                  errors={errors.name}
                  onChange={this.onChange}
                />
                <InputField
                  placeholder="E-mail adresa"
                  name="email"
                  value={this.state.email}
                  errors={errors.email}
                  onChange={this.onChange}
                  info="Ova stranica koristi Gravatar za prikaz korisničke
                  fotografije. Više na www.gravatar.com"
                />
                <InputField
                  placeholder="Lozinka"
                  name="password"
                  type="password"
                  value={this.state.password}
                  errors={errors.password}
                  onChange={this.onChange}
                />
                <InputField
                  placeholder="Potvrdi Lozinku"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  errors={errors.password2}
                  onChange={this.onChange}
                />
                <button type="submit" className="btn btn-info btn-block mt-4">
                  Registracija
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
