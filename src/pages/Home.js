import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ technologies, progress, randomNextTechnology }) {
    const completedCount = technologies.filter(t => t.status === 'completed').length;
    const inProgressCount = technologies.filter(t => t.status === 'in-progress').length;
    const notStartedCount = technologies.filter(t => t.status === 'not-started').length;

    const handleRandomNext = () => {
        const randomTech = randomNextTechnology();
        if (randomTech) {
            alert(`Следующая технология для изучения: ${randomTech.title}`);
        }
    };

    return (
        <div className="home-page">
            <div className="hero-section">
                <h1>Добро пожаловать в Трекер технологий</h1>
                <p>Отслеживайте ваш прогресс в изучении современных технологий разработки</p>
            </div>

            <div className="quick-stats">
                <div className="stat-card">
                    <h3>Общий прогресс</h3>
                    <div className="progress-circle" style={{ '--progress': `${progress}%` }}>
                        <span>{progress}%</span>
                    </div>
                </div>
                <div className="stat-card">
                    <h3>Изучено</h3>
                    <div className="count">{completedCount}</div>
                </div>
                <div className="stat-card">
                    <h3>В процессе</h3>
                    <div className="count">{inProgressCount}</div>
                </div>
                <div className="stat-card">
                    <h3>Не начато</h3>
                    <div className="count">{notStartedCount}</div>
                </div>
            </div>

            <div className="quick-actions-home">
                <Link to="/technologies" className="action-link">
                    <span>📚</span>
                    <h4>Все технологии</h4>
                    <p>Просмотр всех технологий, отслеживание прогресса</p>
                </Link>
                <Link to="/add-technology" className="action-link">
                    <span>➕</span>
                    <h4>Добавить технологию</h4>
                    <p>Добавьте новую технологию для изучения</p>
                </Link>
                <div className="action-link" onClick={handleRandomNext} style={{ cursor: 'pointer' }}>
                    <span>🎲</span>
                    <h4>Случайный выбор</h4>
                    <p>Выберите случайную технологию для изучения</p>
                </div>
                <Link to="/statistics" className="action-link">
                    <span>📊</span>
                    <h4>Статистика</h4>
                    <p>Подробная статистика вашего прогресса</p>
                </Link>
            </div>

            <div className="recent-technologies">
                <h2>Недавние технологии</h2>
                <div className="tech-list">
                    {technologies.slice(0, 3).map(tech => (
                        <Link key={tech.id} to={`/technology/${tech.id}`} className="tech-item">
                            <h4>{tech.title}</h4>
                            <span className={`status-badge ${tech.status}`}>
                                {tech.status === 'completed' && '✅'}
                                {tech.status === 'in-progress' && '🔄'}
                                {tech.status === 'not-started' && '⏳'}
                            </span>
                        </Link>
                    ))}
                </div>
                <Link to="/technologies" className="view-all-link">
                    Посмотреть все технологии →
                </Link>
            </div>
        </div>
    );
}

export default Home;