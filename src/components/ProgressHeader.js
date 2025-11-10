import React from 'react';
import './ProgressHeader.css';

function ProgressHeader({ technologies }) {
    const totalTechnologies = technologies.length;
    const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
    const inProgressTechnologies = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStartedTechnologies = technologies.filter(tech => tech.status === 'not-started').length;

    const progressPercentage = totalTechnologies > 0
        ? Math.round((completedTechnologies / totalTechnologies) * 100)
        : 0;

    return (
        <div className="progress-header">
            <div className="progress-stats">
                <div className="stat-item total">
                    <span className="stat-number">{totalTechnologies}</span>
                    <span className="stat-label">Всего технологий</span>
                </div>
                <div className="stat-item completed">
                    <span className="stat-number">{completedTechnologies}</span>
                    <span className="stat-label">Изучено</span>
                </div>
                <div className="stat-item in-progress">
                    <span className="stat-number">{inProgressTechnologies}</span>
                    <span className="stat-label">В процессе</span>
                </div>
                <div className="stat-item not-started">
                    <span className="stat-number">{notStartedTechnologies}</span>
                    <span className="stat-label">Не начато</span>
                </div>
                <div className="stat-item percentage">
                    <span className="stat-number">{progressPercentage}%</span>
                    <span className="stat-label">Прогресс</span>
                </div>
            </div>

            <div className="progress-bar-container">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div className="progress-labels">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;