import React from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
    const technologies = [
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение функциональных и классовых компонентов, их жизненного цикла и лучших практик использования',
            status: 'completed'
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX, работа с выражениями JavaScript в разметке, понимание различий с HTML',
            status: 'in-progress'
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов, изучение хуков useState и useEffect, управление сложным состоянием',
            status: 'not-started'
        },
        {
            id: 4,
            title: 'Props и Data Flow',
            description: 'Передача данных между компонентами через props, понимание однонаправленного потока данных',
            status: 'completed'
        },
        {
            id: 5,
            title: 'React Router',
            description: 'Настройка маршрутизации в React-приложениях, создание многостраничных интерфейсов',
            status: 'not-started'
        }
    ];

    return (
        <div className="App">
            <div className="app-container">
                <ProgressHeader technologies={technologies} />
                <main className="main-content">
                    <h1>Трекер изучения технологий</h1>
                    <p className="subtitle">
                        Отслеживайте ваш прогресс в изучении современных технологий разработки
                    </p>
                    <div className="technologies-grid">
                        {technologies.map(tech => (
                            <TechnologyCard
                                key={tech.id}
                                title={tech.title}
                                description={tech.description}
                                status={tech.status}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;