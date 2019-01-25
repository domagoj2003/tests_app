import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Header from "./Header";
import Bio from "./Bio";
import Results from "./Results";

class Profiles extends Component {
  render() {
    const { profiles, loading } = this.props.profile;
    const { resultList } = this.props.results;
    let content;
    if (loading) {
      content = (
        <div className="row justify-content-md-center">
          <Spinner />
        </div>
      );
    } else {
      if (Object.keys(profiles).length > 0) {
        content = (
          <div className="container">
            <Header profile={profiles} />
            <Bio profile={profiles} />
            <Results results={resultList} profile={profiles} />
          </div>
        );
      } else {
        content = (
          <div className="container">
            <div className="lead">Korisnik nema profil.</div>
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
const mapStateToProps = state => ({
  profile: state.profile,
  results: state.results
});

export default connect(mapStateToProps)(Profiles);
