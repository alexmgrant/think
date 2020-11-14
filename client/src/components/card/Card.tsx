import React from 'react';
import './Card.css';

const Card = (props: any) => {
  return <section className="Card">{props.children}</section>;
};

export default Card;
