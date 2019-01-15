import React, { Component } from "react";
import Button from "../common/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CancelButton extends Component {
  render() {
    const { actionStatus, timer } = this.props.test;
    let disabled = timer < 1 || !actionStatus;
    return (
      <div className="col-md-12" style={{ marginTop: `2em` }}>
        <Button
          name="prekini"
          disabled={disabled}
          className="btn btn-danger btn-block"
          type="button"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test
});

export default connect(mapStateToProps)(CancelButton);
