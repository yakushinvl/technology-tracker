import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import TechnologyFilter from '../components/TechnologyFilter';
import TechnologySearch from '../components/TechnologySearch';
import './Technologies.css';

function Technologies({
                          technologies,
                          updateStatus,
                          updateNotes,
                          markAllCompleted,
                          resetAllStatuses,
                          randomNextTechnology
                      }) {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredByStatus = technologies.filter(tech => {
        if (filter === 'all') return true;
        return tech.status === filter;
    });

    const filteredTechnologies = filteredByStatus.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tech.notes && tech.notes.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="technologies-page">
            <ProgressHeader technologies={technologies} />
            <QuickActions
                markAllCompleted={markAllCompleted}
                resetAllStatuses={resetAllStatuses}
                randomNextTechnology={randomNextTechnology}
            />

            <TechnologySearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                resultsCount={filteredTechnologies.length}
                totalCount={technologies.length}
            />

            <TechnologyFilter
                currentFilter={filter}
                onFilterChange={setFilter}
            />

            <div className="page-header">
                <h1>Все технологии</h1>
                <Link to="/add-technology" className="btn btn-primary">
                    + Добавить технологию
                </Link>
            </div>

            <div className="technologies-grid">
                {filteredTechnologies.map(tech => (
                    <TechnologyCard
                        key={tech.id}
                        id={tech.id}
                        title={tech.title}
                        description={tech.description}
                        status={tech.status}
                        notes={tech.notes}
                        onStatusChange={updateStatus}
                        onNotesChange={updateNotes}
                    />
                ))}
            </div>

            {filteredTechnologies.length === 0 && (
                <div className="no-results">
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте изменить поисковый запрос или фильтр</p>
                    <Link to="/add-technology" className="btn btn-primary">
                        Добавить первую технологию
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Technologies;