import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";
import { getResults, deleteResult } from "../../actions/resultsActions";
import Header from "./Header";
import Bio from "./Bio";
import { resultsDisplay } from "../../validation/display-data";
import Results from "./Results";

class Board extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getResults();
  }
  onClickDelete = e => {
    console.log(e.target.id);
    const resultId = e.target.id;
    this.props.deleteResult(resultId);
  };
  render() {
    const { profile } = this.props.profile;
    const { resultList, loading } = this.props.results;
    let content;
    if (loading || profile === null) {
      content = (
        <div className="row justify-content-md-center">
          <Spinner />
        </div>
      );
    } else {
      if (Object.keys(profile).length > 0) {
        content = (
          <div className="container">
            <Header profile={profile} />
            <Bio profile={profile} />
            <Results
              onClick={this.onClickDelete}
              results={resultsDisplay(resultList)}
              profile={profile}
            />
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
        <div>{content}</div>
      </div>
    );
  }
}

Board.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  results: state.results
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getResults, deleteResult }
)(Board);
