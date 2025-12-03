import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTechnology.css';

function AddTechnology({ addTechnology }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'not-started'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('Введите название технологии');
            return;
        }

        const newTech = addTechnology(formData);

        // Очистка формы
        setFormData({
            title: '',
            description: '',
            status: 'not-started'
        });

        // Перенаправление на страницу деталей новой технологии
        navigate(`/technology/${newTech.id}`);
    };

    return (
        <div className="add-technology-page">
            <div className="page-header">
                <h1>Добавить новую технологию</h1>
                <button onClick={() => navigate('/technologies')} className="btn btn-secondary">
                    ← Назад к списку
                </button>
            </div>

            <form onSubmit={handleSubmit} className="add-tech-form">
                <div className="form-group">
                    <label htmlFor="title">Название технологии:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Например: React Hooks, Node.js Express, MongoDB"
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Опишите, что вы планируете изучить в рамках этой технологии..."
                        rows="4"
                        className="form-textarea"
                    />
                </div>

                <div className="form-group">
                    <label>Начальный статус:</label>
                    <div className="status-options">
                        <label className="status-option">
                            <input
                                type="radio"
                                name="status"
                                value="not-started"
                                checked={formData.status === 'not-started'}
                                onChange={handleChange}
                            />
                            <span className="status-icon">⏳</span>
                            <span className="status-label">Не начато</span>
                        </label>
                        <label className="status-option">
                            <input
                                type="radio"
                                name="status"
                                value="in-progress"
                                checked={formData.status === 'in-progress'}
                                onChange={handleChange}
                            />
                            <span className="status-icon">🔄</span>
                            <span className="status-label">В процессе</span>
                        </label>
                        <label className="status-option">
                            <input
                                type="radio"
                                name="status"
                                value="completed"
                                checked={formData.status === 'completed'}
                                onChange={handleChange}
                            />
                            <span className="status-icon">✅</span>
                            <span className="status-label">Завершено</span>
                        </label>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        ➕ Добавить технологию
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/technologies')}>
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTechnology;