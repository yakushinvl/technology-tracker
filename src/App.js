import React, { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import TechnologyFilter from './components/TechnologyFilter';
import TechnologySearch from './components/TechnologySearch';

function App() {
    const [technologies, setTechnologies] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Загрузка данных из localStorage при первом рендере
    useEffect(() => {
        const savedData = localStorage.getItem('techTrackerData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setTechnologies(parsedData);
                console.log('Данные загружены из localStorage');
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                // Если ошибка, используем начальные данные
                setTechnologies(initialTechnologies);
            }
        } else {
            setTechnologies(initialTechnologies);
        }
    }, []);

    // Сохранение в localStorage при изменении technologies
    useEffect(() => {
        if (technologies.length > 0) {
            localStorage.setItem('techTrackerData', JSON.stringify(technologies));
            console.log('Данные сохранены в localStorage');
        }
    }, [technologies]);

    // Начальные данные
    const initialTechnologies = [
        {
            id: 1,
            title: 'React Components',
            description: 'Изучение функциональных и классовых компонентов, их жизненного цикла и лучших практик использования',
            status: 'completed',
            notes: 'Важно понимать разницу между функциональными и классовыми компонентами'
        },
        {
            id: 2,
            title: 'JSX Syntax',
            description: 'Освоение синтаксиса JSX, работа с выражениями JavaScript в разметке, понимание различий с HTML',
            status: 'in-progress',
            notes: 'JSX компилируется в вызовы React.createElement'
        },
        {
            id: 3,
            title: 'State Management',
            description: 'Работа с состоянием компонентов, изучение хуков useState и useEffect, управление сложным состоянием',
            status: 'not-started',
            notes: ''
        },
        {
            id: 4,
            title: 'Props и Data Flow',
            description: 'Передача данных между компонентами через props, понимание однонаправленного потока данных',
            status: 'completed',
            notes: 'Props доступны только для чтения, нельзя изменять напрямую'
        },
        {
            id: 5,
            title: 'React Router',
            description: 'Настройка маршрутизации в React-приложениях, создание многостраничных интерфейсов',
            status: 'not-started',
            notes: ''
        }
    ];

    // Функция изменения статуса технологии
    const handleStatusChange = (id, newStatus) => {
        setTechnologies(prevTech =>
            prevTech.map(tech =>
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        );
    };

    // Функция обновления заметок
    const updateTechnologyNotes = (techId, newNotes) => {
        setTechnologies(prevTech =>
            prevTech.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    // Фильтрация технологий по статусу
    const filteredByStatus = technologies.filter(tech => {
        if (filter === 'all') return true;
        return tech.status === filter;
    });

    // Фильтрация по поисковому запросу
    const filteredTechnologies = filteredByStatus.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="App">
            <div className="app-container">
                <ProgressHeader technologies={technologies} />
                <QuickActions
                    technologies={technologies}
                    setTechnologies={setTechnologies}
                />
                <main className="main-content">
                    <h1>Трекер изучения технологий</h1>
                    <p className="subtitle">
                        Отслеживайте ваш прогресс в изучении современных технологий разработки
                    </p>

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

                    <div className="technologies-grid">
                        {filteredTechnologies.map(tech => (
                            <TechnologyCard
                                key={tech.id}
                                id={tech.id}
                                title={tech.title}
                                description={tech.description}
                                status={tech.status}
                                notes={tech.notes}
                                onStatusChange={handleStatusChange}
                                onNotesChange={updateTechnologyNotes}
                            />
                        ))}
                    </div>

                    {filteredTechnologies.length === 0 && (
                        <div className="no-results">
                            <h3>Ничего не найдено</h3>
                            <p>Попробуйте изменить поисковый запрос или фильтр</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;