/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from 'react';
import ItemsResult from './Items/ItemsResult';

class Menu extends React.Component {
  /**
   * Main constructor for the Menu Class
   * @memberof Menu
   */
  constructor() {
    super();
    this.state = {
      showingSearch: false,
      items: [],
      loading: false,
      searchTerm: ''
    };

    this.showSearchContainer = this.showSearchContainer.bind(this);
  }

  /**
   * Fetch data on search
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  showSearchContainer(e) {
    e.preventDefault();
    this.setState({
      showingSearch: !this.state.showingSearch
    });
  }

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param calue string - from search input
   */
  handleSearch(value) {
    this.setState({ loading: true });
    fetch(`http://localhost:3035?filter=${value}`)
      .then(data => data.json())
      .then(data => {
        this.setState({ items: data, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  onSearch(e) {
    // Start Here
    // ...

    // Get value from search input
    const {
      target: { value }
    } = e;

    // If exists more than 2 Chars dispatch search
    if (value.length > 2) {
      this.handleSearch(value.toLowerCase());
      this.setState({ searchTerm: value });
    }
  }

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  render() {
    return (
      <header className="menu">
        <div className="menu-container">
          <div className="menu-holder">
            <a href="/">
              <h1>ELC</h1>
            </a>
            <nav>
              <a href="#" className="nav-item">
                HOLIDAY
              </a>
              <a href="#" className="nav-item">
                WHAT'S NEW
              </a>
              <a href="#" className="nav-item">
                PRODUCTS
              </a>
              <a href="#" className="nav-item">
                BESTSELLERS
              </a>
              <a href="#" className="nav-item">
                GOODBYES
              </a>
              <a href="#" className="nav-item">
                STORES
              </a>
              <a href="#" className="nav-item">
                INSPIRATION
              </a>

              <a href="#" onClick={e => this.showSearchContainer(e)}>
                <i className="material-icons search">search</i>
              </a>
            </nav>
          </div>
        </div>
        <div
          className={
            (this.state.showingSearch ? 'showing ' : '') + 'search-container'
          }
        >
          <div className="Menu-inputWrapper">
            <input
              type="text"
              onChange={e => this.onSearch(e)}
              placeholder="ENTER SEARCH TERM"
            />
            <a href="#" onClick={e => this.showSearchContainer(e)}>
              <i className="material-icons close">close</i>
            </a>
          </div>
          <div className="Menu-resultWrapper">
            {this.state.loading && <span>Loading...</span>}
            {this.state.items.length > 0 && (
              <ItemsResult
                items={this.state.items}
                searchTerm={this.state.searchTerm}
                showSearchContainer={this.showSearchContainer}
              />
            )}
          </div>
        </div>
      </header>
    );
  }
}

// Export out the React Component
module.exports = Menu;
