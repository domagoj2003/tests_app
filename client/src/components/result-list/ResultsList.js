import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

class ResultsList extends Component {
  render() {
    const { results, onClick } = this.props;
    let content = results.map((res, i) => (
      <tr key={res._id}>
        <th scope="row">{i + 1}</th>
        <td onClick={onClick}>
          <Link to="/profili" id={res.user._id}>
            {res.user.name}
          </Link>
        </td>

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
              <th scope="col">Ime</th>
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
