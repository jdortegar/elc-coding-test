/**
 * This file render a item list with details or with out them, this is all rendered using a React Component...
 *
 */

import React from 'react';

const ItemsList = ({ items, number, showDetails }) => {
  const itemsNumber = number ? number : items.length;

  return (
    <ul className="itemsList">
      {items.slice(0, itemsNumber).map(item => (
        <li className="Item" key={item._id}>
          <div className="Item-description">
            <div className="Item-description-image">
              <img src={item.picture}></img>
            </div>
            <div className="Item-description-text">
              <h3>{item.name}</h3>
              <p>{item.about}</p>
            </div>
          </div>
          {showDetails && (
            <div className="Item-details">
              <div className="Item-details-price">
                <h2>$ {item.price}</h2>
              </div>
              <a className="Item-details-button">Buy Now</a>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

ItemsList.defaultProps = {
  items: []
};

export default ItemsList;
