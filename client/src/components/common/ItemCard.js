import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ItemCard = ({ item, onClick, to, id, style }) => (
  <div
    className="card rounded m-2"
    style={{
      width: `14rem`,
      height: `14rem`,
      backgroundColor: `lightgray`
    }}
  >
    <Link to={to} id={id} onClick={onClick} style={style}>
      {item}
    </Link>
  </div>
);

export default ItemCard;
