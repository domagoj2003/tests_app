import React, { Component } from "react";
import { connect } from "react-redux";

class Points extends Component {
  render() {
    const { maxPoints, points } = this.props.test;

    return (
      <div className="col-md-12 align-middle">
        <h4>Bodovi:</h4>
        <h2>
          {points} / {maxPoints}
        </h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test
});

export default connect(mapStateToProps)(Points);
