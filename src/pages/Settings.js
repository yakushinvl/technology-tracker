import React, { useState } from 'react';
import './Settings.css';

function Settings({ clearAllData, exportData }) {
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState(true);

    const handleClearData = () => {
        clearAllData();
    };

    const handleExport = () => {
        exportData();
        alert('Данные успешно экспортированы!');
    };

    return (
        <div className="settings-page">
            <h1>Настройки приложения</h1>

            <div className="settings-section">
                <h3>Внешний вид</h3>
                <div className="theme-options">
                    <label className="theme-option">
                        <input
                            type="radio"
                            name="theme"
                            value="light"
                            checked={theme === 'light'}
                            onChange={(e) => setTheme(e.target.value)}
                        />
                        <div className="theme-preview light-theme">
                            <div className="theme-header"></div>
                            <div className="theme-content"></div>
                        </div>
                        <span>Светлая тема</span>
                    </label>
                    <label className="theme-option">
                        <input
                            type="radio"
                            name="theme"
                            value="dark"
                            checked={theme === 'dark'}
                            onChange={(e) => setTheme(e.target.value)}
                        />
                        <div className="theme-preview dark-theme">
                            <div className="theme-header"></div>
                            <div className="theme-content"></div>
                        </div>
                        <span>Темная тема</span>
                    </label>
                </div>
            </div>

            <div className="settings-section">
                <h3>Уведомления</h3>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={notifications}
                        onChange={(e) => setNotifications(e.target.checked)}
                    />
                    <span>Получать уведомления о прогрессе</span>
                </label>
            </div>

            <div className="settings-section">
                <h3>Управление данными</h3>
                <div className="data-actions">
                    <button onClick={handleExport} className="btn btn-primary">
                        📥 Экспорт данных
                    </button>
                    <button onClick={handleClearData} className="btn btn-danger">
                        🗑️ Очистить все данные
                    </button>
                </div>
                <p className="warning-text">
                    Внимание: Очистка данных удалит все ваши технологии и заметки. Это действие нельзя отменить!
                </p>
            </div>

            <div className="settings-section">
                <h3>О приложении</h3>
                <div className="about-info">
                    <p><strong>Версия:</strong> 1.0.0</p>
                    <p><strong>Разработчик:</strong> Трекер технологий</p>
                    <p><strong>Описание:</strong> Приложение для отслеживания прогресса изучения технологий</p>
                </div>
            </div>
        </div>
    );
}

export default Settings;