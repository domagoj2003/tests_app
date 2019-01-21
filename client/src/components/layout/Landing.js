import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profil");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Testovi</h1>
                <p className="lead">Portal za provjeru znanja</p>
                <p className="lead" />
                <hr />
                <Link to="/registracija" className="btn btn-lg btn-info mr-2">
                  Registracija
                </Link>
                <Link to="/prijava" className="btn btn-lg btn-light">
                  Prijava
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
