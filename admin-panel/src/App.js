import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ActiveGroups from './pages/ActiveGroups';
import QuizManagement from './pages/QuizManagement';
import AnnouncementManagement from './pages/AnnouncementManagement';
import PollManagement from './pages/PollManagement';
import CreateQuiz from './pages/CreateQuiz';
import PostQuiz from './pages/PostQuiz';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Navbar />
        <div style={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/active-groups" element={<ActiveGroups />} />
              <Route path="/quiz-management" element={<QuizManagement />} />
              <Route path="/announcement-management" element={<AnnouncementManagement />} />
              <Route path="/poll-management" element={<PollManagement />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/post-quiz" element={<PostQuiz />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
