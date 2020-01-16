/**
 * This file show the Search Results Page, this is all rendered using React Hooks...
 *
 */
import React, { useState, useEffect } from 'react';

import ItemsList from './Items/ItemsList';

const Search = ({ ...props }) => {
  const [items, setItems] = useState([]);

  const { searchTerm } = props.match.params;

  useEffect(() => {
    // Refetch data from server if Seach Term changes

    const formatQuery = searchTerm.toLowerCase();

    fetch(`http://localhost:3035?filter=${formatQuery}`)
      .then(data => data.json())
      .then(data => {
        setItems(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [searchTerm]);

  return (
    <div className="SearchPage">
      <div className="SearchPage-header">
        <div className="SearchPage-header-searchTerm">
          <h1>{searchTerm}</h1>
        </div>
      </div>
      <div className="SearchPage-body">
        <h1 className="SearchPage-body-title">Search Result</h1>
        <ItemsList items={items} showDetails={true} />
      </div>
    </div>
  );
};

// Export out the React Component
export default Search;
