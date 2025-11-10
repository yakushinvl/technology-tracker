import React from 'react';
import './QuickActions.css';

function QuickActions({ technologies, setTechnologies }) {
    const markAllCompleted = () => {
        setTechnologies(prevTech =>
            prevTech.map(tech => ({ ...tech, status: 'completed' }))
        );
    };

    const resetAllStatuses = () => {
        setTechnologies(prevTech =>
            prevTech.map(tech => ({ ...tech, status: 'not-started' }))
        );
    };

    const randomNextTechnology = () => {
        const notStartedTech = technologies.filter(tech => tech.status === 'not-started');
        if (notStartedTech.length === 0) {
            alert('Все технологии уже начаты или завершены!');
            return;
        }

        const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)];
        setTechnologies(prevTech =>
            prevTech.map(tech =>
                tech.id === randomTech.id ? { ...tech, status: 'in-progress' } : tech
            )
        );

        alert(`Следующая технология: ${randomTech.title}`);
    };

    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="action-buttons">
                <button
                    className="action-btn complete-all"
                    onClick={markAllCompleted}
                >
                    ✅ Отметить все как выполненные
                </button>
                <button
                    className="action-btn reset-all"
                    onClick={resetAllStatuses}
                >
                    🔄 Сбросить все статусы
                </button>
                <button
                    className="action-btn random-next"
                    onClick={randomNextTechnology}
                >
                    🎲 Случайный выбор следующей технологии
                </button>
            </div>
        </div>
    );
}

export default QuickActions;