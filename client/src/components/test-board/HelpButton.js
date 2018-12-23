import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../common/Button";
import { helpStatus } from "../../actions/testActions";

class HelpButton extends Component {
  onClick = e => {
    this.props.helpStatus();
  };

  render() {
    return (
      <div className="col-md-12">
        <Button
          name="pomoć"
          className="btn btn-info"
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
  { helpStatus }
)(HelpButton);
