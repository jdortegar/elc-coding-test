import React from 'react';
import { withRouter } from 'react-router-dom';

import ItemsList from './ItemsList';

class ItemsResult extends React.Component {
  /**
   * Main constructor for the ItemsResult Class
   * @memberof ItemsResult
   */
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    const { searchTerm } = this.props;

    this.props.showSearchContainer(e);
    this.props.history.push(`/search/${searchTerm}`);
  }

  render() {
    const { items, searchTerm, showSearchContainer } = this.props;
    const counter = items.length > 4 ? 4 : items.length;
    return (
      <div className="ItemsResult">
        <div className="ItemsResult-header">
          <div className="ItemsResult-counter">
            DISPLAYING {counter} OF {items.length}
          </div>
          <div className="ItemsResult-link">
            <a onClick={this.handleClick}>SEE ALL RESULTS</a>
          </div>
        </div>
        <div className="ItemsResult-body">
          <ItemsList items={items} number={4} />
        </div>
      </div>
    );
  }
}

export default withRouter(ItemsResult);
