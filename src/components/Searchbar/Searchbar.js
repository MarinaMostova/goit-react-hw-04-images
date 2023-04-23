import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';
import './Searchbar.css';

class Searchbar extends Component {
  state = {
    inputData: '',
  };

  handleChange = evt => {
    const inputData = evt.currentTarget.value;
    this.setState({
      inputData,
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { inputData } = this.state;
    this.props.onSubmit(inputData);
  };

  render() {
    const { inputData } = this.state;
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <GoSearch className="icon" />
          </button>

          <input
            value={inputData}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
