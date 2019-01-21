import React, { Component } from "react";
import { connect } from "react-redux";
import SelectField from "../common/SelectField";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "A"
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const options = [
      { label: "Rangiraj prema uspjehu", value: "A" },
      { label: "Rangiraj prema datumu", value: "B" }
    ];

    return (
      <div>
        <h1 className="display-4 text-center">Rezultati</h1>
        <SelectField
          name="order"
          value={this.state.order}
          options={options}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default connect()(Results);
