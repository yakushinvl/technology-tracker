import React from 'react';
import './TechnologyCard.css';

function TechnologyCard({ title, description, status }) {
    return (
        <div className={`technology-card ${status}`}>
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
                <span className={`status-badge ${status}`}>
          {status === 'completed' && '✅'}
                    {status === 'in-progress' && '🔄'}
                    {status === 'not-started' && '⏳'}
                    {getStatusText(status)}
        </span>
            </div>
            <p className="card-description">{description}</p>
        </div>
    );
}

function getStatusText(status) {
    const statusMap = {
        'completed': 'Изучено',
        'in-progress': 'В процессе',
        'not-started': 'Не начато'
    };
    return statusMap[status] || status;
}

export default TechnologyCard;