import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";

class Navbar extends Component {
  onClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/prijava">
            Prijava
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/registracija">
            Registracija
          </Link>
        </li>
      </ul>
    );
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/profil">
            <strong>{user.name}</strong>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/odjava" onClick={this.onClick}>
            Odjavi se
          </Link>
        </li>
      </ul>
    );

    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark mb-4"
        style={{
          backgroundColor: `dodgerblue`
        }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            Učionica
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/rezultati">
                  Poredak
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/razred">
                  Testovi
                </Link>
              </li>
              {user.admin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/ploca">
                    Upravljačka Ploča
                  </Link>
                </li>
              )}
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
