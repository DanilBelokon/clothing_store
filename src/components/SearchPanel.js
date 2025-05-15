const SearchPanel = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-panel" id="search-panel">
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          className="search-clear"
          onClick={() => setSearchQuery("")}
          aria-label="Очистить поиск"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchPanel;
