import React, { Component } from "react";
import Button from "../common/Button";

class CancelButton extends Component {
  render() {
    return (
      <div className="col-md-12" style={{ marginTop: `2em` }}>
        <Button name="prekini" className="btn btn-danger" type="button" />
      </div>
    );
  }
}

export default CancelButton;
