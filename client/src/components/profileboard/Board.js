import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profileActions";
import Header from "./Header";
import Bio from "./Bio";
import Results from "./Results";

class Board extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;
    let content;
    if (loading || profile === null) {
      content = (
        <div className="contaner">
          <p className="lead">Loading...</p>
        </div>
      );
    } else {
      if (Object.keys(profile).length > 0) {
        content = (
          <div className="container">
            <Header profile={profile} />
            <Bio profile={profile} />
            <Results profile={profile} />
          </div>
        );
      } else {
        content = (
          <div className="container">
            <div className="lead">
              Još uvijek nemaš svoj profil. <br /> Kreiranjem profila, možeš
              reći drugima malo više o sebi, <br />
              objaviti svoje rezultate, komunicirati sa drugim članovima.
            </div>
            <Link to="/kreiraj-profil">
              <button className="btn btn-info btn-lg">Kreiraj profil</button>
            </Link>
          </div>
        );
      }
    }
    return (
      <div>
        <div className="lead">{content}</div>
      </div>
    );
  }
}

Board.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Board);
