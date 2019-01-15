import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "./Button";

class Grades extends Component {
  render() {
    const grade = this.props.grades.map((item, index) => (
      <div key={index}>
        <p>
          <Button
            name={item.name}
            id={item.id}
            onClick={this.props.onClick}
            className="btn btn-light btn-block"
          />
        </p>
      </div>
    ));

    return <div className="col-md-4 text-center">{grade}</div>;
  }
}
Grades.propTypes = {
  tests: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tests: state.tests
});

export default connect(
  mapStateToProps,
  {}
)(Grades);
