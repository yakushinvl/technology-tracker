import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './TechnologyDetail.css';

function TechnologyDetail({ technologies, updateStatus, updateNotes, deleteTechnology, updateTechnology }) {
    const { techId } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const technology = technologies.find(t => t.id === parseInt(techId));

    if (!technology) {
        return (
            <div className="technology-detail-page">
                <h1>Технология не найдена</h1>
                <p>Технология с ID {techId} не существует.</p>
                <Link to="/technologies" className="btn">
                    ← Назад к списку
                </Link>
            </div>
        );
    }

    const handleEdit = () => {
        setEditTitle(technology.title);
        setEditDescription(technology.description);
        setIsEditing(true);
    };

    const handleSave = () => {
        updateTechnology(parseInt(techId), {
            title: editTitle,
            description: editDescription
        });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить эту технологию?')) {
            deleteTechnology(parseInt(techId));
            navigate('/technologies');
        }
    };

    const handleStatusChange = (newStatus) => {
        updateStatus(parseInt(techId), newStatus);
    };

    const handleNotesChange = (newNotes) => {
        updateNotes(parseInt(techId), newNotes);
    };

    const getStatusText = (status) => {
        const statusMap = {
            'completed': 'Изучено',
            'in-progress': 'В процессе',
            'not-started': 'Не начато'
        };
        return statusMap[status] || status;
    };

    return (
        <div className="technology-detail-page">
            <div className="detail-header">
                <Link to="/technologies" className="back-link">
                    ← Назад к списку
                </Link>
                <div className="header-actions">
                    <button onClick={handleEdit} className="btn btn-secondary">
                        ✏️ Редактировать
                    </button>
                    <button onClick={handleDelete} className="btn btn-danger">
                        🗑️ Удалить
                    </button>
                </div>
            </div>

            {isEditing ? (
                <div className="edit-form">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="edit-input"
                        placeholder="Название технологии"
                    />
                    <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="edit-textarea"
                        placeholder="Описание технологии"
                        rows="4"
                    />
                    <div className="edit-actions">
                        <button onClick={handleSave} className="btn btn-primary">
                            💾 Сохранить
                        </button>
                        <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
                            ❌ Отмена
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <h1>{technology.title}</h1>
                    <div className={`status-badge-large ${technology.status}`}>
                        {technology.status === 'completed' && '✅'}
                        {technology.status === 'in-progress' && '🔄'}
                        {technology.status === 'not-started' && '⏳'}
                        {getStatusText(technology.status)}
                    </div>

                    <div className="detail-content">
                        <div className="section">
                            <h3>Описание</h3>
                            <p>{technology.description}</p>
                        </div>

                        <div className="section">
                            <h3>Статус изучения</h3>
                            <div className="status-buttons">
                                <button
                                    onClick={() => handleStatusChange('not-started')}
                                    className={`status-btn ${technology.status === 'not-started' ? 'active' : ''}`}
                                >
                                    ⏳ Не начато
                                </button>
                                <button
                                    onClick={() => handleStatusChange('in-progress')}
                                    className={`status-btn ${technology.status === 'in-progress' ? 'active' : ''}`}
                                >
                                    🔄 В процессе
                                </button>
                                <button
                                    onClick={() => handleStatusChange('completed')}
                                    className={`status-btn ${technology.status === 'completed' ? 'active' : ''}`}
                                >
                                    ✅ Завершено
                                </button>
                            </div>
                        </div>

                        <div className="section">
                            <h3>Мои заметки</h3>
                            <textarea
                                value={technology.notes || ''}
                                onChange={(e) => handleNotesChange(e.target.value)}
                                placeholder="Записывайте сюда важные моменты, ссылки, примеры кода..."
                                rows="6"
                                className="notes-textarea"
                            />
                            <div className="notes-hint">
                                {technology.notes && technology.notes.length > 0
                                    ? `Заметка сохранена (${technology.notes.length} символов)`
                                    : 'Добавьте заметку для этой технологии'}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default TechnologyDetail;