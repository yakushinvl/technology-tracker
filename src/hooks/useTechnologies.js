// hooks/useTechnologies.js
import useLocalStorage from './useLocalStorage';

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
    const [technologies, setTechnologies] = useLocalStorage('techTrackerData', initialTechnologies);

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

    return {
        technologies,
        updateStatus,
        updateNotes,
        progress: calculateProgress(),
        markAllCompleted,
        resetAllStatuses,
        randomNextTechnology
    };
}

export default useTechnologies;