import React, { Component } from "react";

class Timer extends Component {
  render() {
    return (
      <div className="col-md-12 align-middle" style={{ marginTop: `1em` }}>
        <h4>Vrijeme:</h4>
        <h1>:20</h1>
      </div>
    );
  }
}

export default Timer;
