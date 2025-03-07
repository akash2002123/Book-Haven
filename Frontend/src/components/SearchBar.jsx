import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by title or author"
        value={query}
        onChange={handleInputChange}
      />
      <div className="input-group-append">
        <span className="input-group-text"><i className="fa fa-search"></i></span>
      </div>
    </div>
  );
};

export default SearchBar;