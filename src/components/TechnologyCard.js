import React from 'react';
import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
    const handleClick = () => {
        const statusOrder = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statusOrder.indexOf(status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const nextStatus = statusOrder[nextIndex];

        onStatusChange(id, nextStatus);
    };

    return (
        <div
            className={`technology-card ${status}`}
            onClick={handleClick}
        >
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
            <div className="click-hint">Нажмите для смены статуса</div>
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