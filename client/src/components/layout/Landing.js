import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Nauči Za Ispit</h1>
                <p className="lead">
                  Riješi ispite, nauči aktualno gradivo, komuniciraj sa drugim
                  članovima. Potpuno besplatno.
                </p>
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

export default Landing;
