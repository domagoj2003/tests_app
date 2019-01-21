import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../common/Button";
import { helpStatus, noHelp } from "../../actions/testActions";

class HelpButton extends Component {
  onClick = e => {
    const { currentQuestion } = this.props.test;
    if (currentQuestion.help) {
      this.props.helpStatus();
    } else {
      this.props.noHelp();
    }
  };

  render() {
    const { actionStatus, timer } = this.props.test;
    let disabled = timer < 1 || !actionStatus;
    return (
      <div className="col-md-12">
        <Button
          name="pomoć"
          disabled={disabled}
          className="btn btn-info btn-block"
          type="button"
          onClick={this.onClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test
});

export default connect(
  mapStateToProps,
  { helpStatus, noHelp }
)(HelpButton);
