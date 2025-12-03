import React from 'react';
import './Statistics.css';

function Statistics({ technologies, progress, exportData }) {
    const completed = technologies.filter(t => t.status === 'completed').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const notStarted = technologies.filter(t => t.status === 'not-started').length;
    const total = technologies.length;

    const data = [
        { label: 'Изучено', value: completed, color: '#4CAF50' },
        { label: 'В процессе', value: inProgress, color: '#FF9800' },
        { label: 'Не начато', value: notStarted, color: '#9E9E9E' }
    ];

    const handleExport = () => {
        exportData();
        alert('Данные успешно экспортированы! Файл скачан на ваше устройство.');
    };

    return (
        <div className="statistics-page">
            <h1>Статистика прогресса</h1>

            <div className="stats-overview">
                <div className="stat-card">
                    <h3>Общий прогресс</h3>
                    <div className="progress-circle" style={{ '--progress': `${progress}%` }}>
                        <span>{progress}%</span>
                    </div>
                </div>
                <div className="stat-card">
                    <h3>Изучено</h3>
                    <div className="count">{completed}</div>
                </div>
                <div className="stat-card">
                    <h3>В процессе</h3>
                    <div className="count">{inProgress}</div>
                </div>
                <div className="stat-card">
                    <h3>Не начато</h3>
                    <div className="count">{notStarted}</div>
                </div>
            </div>

            <div className="chart-container">
                <h3>Распределение по статусам</h3>
                <div className="chart">
                    {data.map(item => (
                        <div
                            key={item.label}
                            className="chart-bar"
                            style={{
                                backgroundColor: item.color,
                                width: total > 0 ? `${(item.value / total) * 100}%` : '0%'
                            }}
                        >
                            <span>{item.label}: {item.value} ({total > 0 ? Math.round((item.value / total) * 100) : 0}%)</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="detailed-stats">
                <h3>Детальная статистика</h3>
                <table className="stats-table">
                    <thead>
                    <tr>
                        <th>Статус</th>
                        <th>Количество</th>
                        <th>Процент</th>
                        <th>Цвет</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(item => (
                        <tr key={item.label}>
                            <td>{item.label}</td>
                            <td>{item.value}</td>
                            <td>{total > 0 ? Math.round((item.value / total) * 100) : 0}%</td>
                            <td>
                                <div className="color-sample" style={{ backgroundColor: item.color }}></div>
                            </td>
                        </tr>
                    ))}
                    <tr className="total-row">
                        <td><strong>Всего</strong></td>
                        <td><strong>{total}</strong></td>
                        <td><strong>100%</strong></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="export-section">
                <button onClick={handleExport} className="btn btn-primary">
                    📥 Экспорт данных
                </button>
                <p className="export-hint">
                    Данные будут экспортированы в формате JSON и скачаны на ваше устройство
                </p>
            </div>
        </div>
    );
}

export default Statistics;