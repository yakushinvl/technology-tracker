import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, notes, onStatusChange, onNotesChange }) {
    const [isNotesVisible, setIsNotesVisible] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = () => {
        const statusOrder = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statusOrder.indexOf(status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const nextStatus = statusOrder[nextIndex];

        onStatusChange(id, nextStatus);
    };

    const handleNotesClick = (e) => {
        e.stopPropagation();
        setIsNotesVisible(!isNotesVisible);
    };

    const handleNotesChange = (e) => {
        e.stopPropagation();
        onNotesChange(id, e.target.value);
    };

    const handleDetailsClick = (e) => {
        e.stopPropagation();
        navigate(`/technology/${id}`);
    };

    return (
        <div
            className={`technology-card ${status}`}
            onClick={handleCardClick}
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

            <div className="card-actions">
                <button
                    className="notes-toggle-btn"
                    onClick={handleNotesClick}
                >
                    📝 {notes ? 'Заметки (' + notes.length + ')' : 'Добавить заметки'}
                </button>
                <button
                    className="details-btn"
                    onClick={handleDetailsClick}
                >
                    🔍 Подробнее
                </button>
                <div className="click-hint">Нажмите на карточку для смены статуса</div>
            </div>

            {isNotesVisible && (
                <div className="notes-section" onClick={(e) => e.stopPropagation()}>
                    <h4>Мои заметки:</h4>
                    <textarea
                        value={notes || ''}
                        onChange={handleNotesChange}
                        placeholder="Записывайте сюда важные моменты, ссылки, примеры кода..."
                        rows="4"
                        className="notes-textarea"
                    />
                    <div className="notes-hint">
                        {notes && notes.length > 0
                            ? `Заметка сохранена (${notes.length} символов)`
                            : 'Добавьте заметку для этой технологии'}
                    </div>
                </div>
            )}
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