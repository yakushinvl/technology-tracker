import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useTechnologies from './hooks/useTechnologies';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Technologies from './pages/Technologies';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import './App.css';

function App() {
    const {
        technologies,
        updateStatus,
        updateNotes,
        addTechnology,
        deleteTechnology,
        updateTechnology,
        progress,
        markAllCompleted,
        resetAllStatuses,
        randomNextTechnology,
        exportData,
        clearAllData
    } = useTechnologies();

    return (
        <Router>
            <div className="App">
                <Navigation />
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={
                            <Home
                                technologies={technologies}
                                progress={progress}
                                randomNextTechnology={randomNextTechnology}
                            />
                        } />
                        <Route path="/technologies" element={
                            <Technologies
                                technologies={technologies}
                                updateStatus={updateStatus}
                                updateNotes={updateNotes}
                                markAllCompleted={markAllCompleted}
                                resetAllStatuses={resetAllStatuses}
                                randomNextTechnology={randomNextTechnology}
                            />
                        } />
                        <Route path="/technology/:techId" element={
                            <TechnologyDetail
                                technologies={technologies}
                                updateStatus={updateStatus}
                                updateNotes={updateNotes}
                                deleteTechnology={deleteTechnology}
                                updateTechnology={updateTechnology}
                            />
                        } />
                        <Route path="/add-technology" element={
                            <AddTechnology addTechnology={addTechnology} />
                        } />
                        <Route path="/statistics" element={
                            <Statistics
                                technologies={technologies}
                                progress={progress}
                                exportData={exportData}
                            />
                        } />
                        <Route path="/settings" element={
                            <Settings
                                clearAllData={clearAllData}
                                exportData={exportData}
                            />
                        } />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;