import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GoSearch } from 'react-icons/go';
import './Searchbar.css';

const Searchbar = ({ onSubmit }) => {
  const [inputData, setInputData] = useState('');

  const handleChange = evt => {
    setInputData(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(inputData);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
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
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
