import React from 'react';
import './TechnologyFilter.css';

function TechnologyFilter({ currentFilter, onFilterChange }) {
    const filters = [
        { key: 'all', label: 'Все технологии', emoji: '📚' },
        { key: 'not-started', label: 'Не начатые', emoji: '⏳' },
        { key: 'in-progress', label: 'В процессе', emoji: '🔄' },
        { key: 'completed', label: 'Выполненные', emoji: '✅' }
    ];

    return (
        <div className="technology-filter">
            <h4>Фильтр по статусу:</h4>
            <div className="filter-buttons">
                {filters.map(filter => (
                    <button
                        key={filter.key}
                        className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
                        onClick={() => onFilterChange(filter.key)}
                    >
                        <span className="filter-emoji">{filter.emoji}</span>
                        <span className="filter-label">{filter.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TechnologyFilter;