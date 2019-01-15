import React, { Component } from "react";
import { connect } from "react-redux";

class HelpField extends Component {
  render() {
    const { currentQuestion, helpStatus } = this.props.test;
    let content;
    if (!currentQuestion || !helpStatus) {
      content = null;
    } else {
      content = (
        <div style={{ marginTop: `1.5em` }}>
          <p className="lead text-info">{currentQuestion.help}</p>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

const mapStateToProps = state => ({
  test: state.test
});

export default connect(mapStateToProps)(HelpField);
