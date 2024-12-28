import React, { useState } from 'react';

const SearchBar = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  const [keyword, setKeyWord] = useState(urlParams.get('keyword'));
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/list?keyword=${keyword}`;
  }

  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      onSubmit={handleSubmit}
    >
      <input
        value={keyword}
        onChange={(e) => setKeyWord(e.target.value)}
        type="text"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <button className="cursor-pointer" type='submit' > 
        <img src="/search.png" alt="" width={16} height={16} />
      </button>
    </form>
  )
}

export default SearchBar
