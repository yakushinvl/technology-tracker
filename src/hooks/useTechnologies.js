import { useState, useEffect } from 'react';

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

function useTechnologies() {
    const [technologies, setTechnologies] = useState(() => {
        const savedData = localStorage.getItem('techTrackerData');
        return savedData ? JSON.parse(savedData) : initialTechnologies;
    });

    // Сохраняем в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    }, [technologies]);

    const updateStatus = (techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    const addTechnology = (newTech) => {
        const techWithId = {
            ...newTech,
            id: Date.now(), // Простой способ генерации ID
            notes: ''
        };
        setTechnologies(prev => [...prev, techWithId]);
        return techWithId;
    };

    const deleteTechnology = (techId) => {
        setTechnologies(prev => prev.filter(tech => tech.id !== techId));
    };

    const updateTechnology = (techId, updatedFields) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, ...updatedFields } : tech
            )
        );
    };

    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

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
            return null;
        }
        return notStartedTech[Math.floor(Math.random() * notStartedTech.length)];
    };

    const exportData = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies: technologies,
            statistics: {
                total: technologies.length,
                completed: technologies.filter(t => t.status === 'completed').length,
                inProgress: technologies.filter(t => t.status === 'in-progress').length,
                notStarted: technologies.filter(t => t.status === 'not-started').length,
                progress: calculateProgress()
            }
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `tech-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);

        return data;
    };

    const clearAllData = () => {
        if (window.confirm('Вы уверены, что хотите удалить все данные? Это действие нельзя отменить.')) {
            setTechnologies([]);
            localStorage.removeItem('techTrackerData');
        }
    };

    return {
        technologies,
        updateStatus,
        updateNotes,
        addTechnology,
        deleteTechnology,
        updateTechnology,
        progress: calculateProgress(),
        markAllCompleted,
        resetAllStatuses,
        randomNextTechnology,
        exportData,
        clearAllData
    };
}

export default useTechnologies;