import React, { Component } from "react";
import { connect } from "react-redux";

class TestBoard extends Component {
  render() {
    return (
      <div>
        <h3>test board</h3>
      </div>
    );
  }
}

export default connect()(TestBoard);
