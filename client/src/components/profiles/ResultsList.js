import React, { Component } from "react";
import Moment from "react-moment";

class ResultsList extends Component {
  render() {
    const { results, profile } = this.props;
    let content = results
      .filter(res => res.user._id === profile.user._id)
      .map((res, i) => (
        <tr key={res._id}>
          <th scope="row">{i + 1}</th>
          <td>
            {res.grade}. Razred - {res.subject} - {res.section}
          </td>
          <td>
            {res.points}/{res.maxpoints}
          </td>
          <td>{res.percentage} %</td>
          <td>
            <Moment format="DD.MM.YYYY">{res.date}</Moment>
          </td>
          <td>Like</td>
          <td>Comment</td>
        </tr>
      ));

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Gradivo</th>
              <th scope="col">Bodovi</th>
              <th scope="col">Uspjeh</th>
              <th scope="col">Datum</th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    );
  }
}

export default ResultsList;
