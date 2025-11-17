import React from 'react';
import './TechnologySearch.css';

function TechnologySearch({ searchQuery, onSearchChange, resultsCount, totalCount }) {
    const handleClearSearch = () => {
        onSearchChange('');
    };

    return (
        <div className="technology-search">
            <div className="search-header">
                <h3>Поиск технологий</h3>
                <div className="search-stats">
                    Найдено: {resultsCount} из {totalCount}
                </div>
            </div>

            <div className="search-box">
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Поиск по названию, описанию или заметкам..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="search-input"
                    />
                    {searchQuery && (
                        <button
                            className="clear-search-btn"
                            onClick={handleClearSearch}
                            title="Очистить поиск"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {searchQuery && (
                    <div className="search-info">
                        Поиск: "{searchQuery}"
                    </div>
                )}
            </div>
        </div>
    );
}

export default TechnologySearch;