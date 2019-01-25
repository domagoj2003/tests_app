import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ItemCard = ({ item, onClick, to, id, textStyle, cardStyle }) => (
  <div className="card rounded m-2" style={cardStyle}>
    <Link to={to} id={id} onClick={onClick} style={textStyle}>
      {item}
    </Link>
  </div>
);

export default ItemCard;
