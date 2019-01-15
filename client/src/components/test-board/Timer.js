import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setTimer, actionStatus } from "../../actions/testActions";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerInterval: null
    };
  }
  componentDidMount() {
    if (this.props.test.actionStatus) {
      this.setState({
        timerInterval: setInterval(this.props.setTimer, 1000)
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.timerInterval);
  }

  render() {
    let { timer, actionStatus } = this.props.test;
    let content =
      timer < 1 && actionStatus
        ? `isteklo`
        : !actionStatus
        ? null
        : `${timer} sec`;
    return (
      <div className="col-md-12 align-middle" style={{ marginTop: `1em` }}>
        <h4>Vrijeme:</h4>
        <h2>{content}</h2>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  test: state.test
});

export default connect(
  mapStateToProps,
  { setTimer, actionStatus }
)(Timer);
