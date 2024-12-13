import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const toggleQuizSection = () => {
    setIsQuizOpen(!isQuizOpen);
  };

  return (
    <aside
      style={{
        backgroundColor: '#f4f4f4',
        borderRight: '1px solid #ddd',
        transition: 'width 0.3s ease',
        width: expanded ? '200px' : '60px',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '10px',
          position: 'absolute',
          top: '10px',
          right: '-20px'
        }}
        onClick={toggleSidebar}
      >
        {expanded ? '<' : '>'}
      </button>
      <ul
        style={{
          listStyle: 'none',
          padding: '20px 0',
          margin: 0
        }}
      >
        <li style={{ padding: '10px 20px', cursor: 'pointer' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Dashboard</Link>
        </li>
        <li style={{ padding: '10px 20px', cursor: 'pointer' }}>
          <Link to="/active-groups" style={{ textDecoration: 'none', color: 'black' }}>Active Groups</Link>
        </li>
        
        {/* Quiz Management Section */}
        <li
          onClick={toggleQuizSection}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          <Link to="/quiz-management" style={{ textDecoration: 'none', color: 'black' }}>
            Quiz Management
          </Link>
          {isQuizOpen && (
            <ul style={{ paddingLeft: '20px' }}>
              <li style={{ padding: '10px 20px' }}>
                <Link to="/create-quiz" style={{ textDecoration: 'none', color: 'black' }}>Create Quiz</Link>
              </li>
              <li style={{ padding: '10px 20px' }}>
                <Link to="/post-quiz" style={{ textDecoration: 'none', color: 'black' }}>Post Quiz</Link>
              </li>
            </ul>
          )}
        </li>

        <li style={{ padding: '10px 20px', cursor: 'pointer' }}>
          <Link to="/announcement-management" style={{ textDecoration: 'none', color: 'black' }}>Announcement Management</Link>
        </li>
        <li style={{ padding: '10px 20px', cursor: 'pointer' }}>
          <Link to="/poll-management" style={{ textDecoration: 'none', color: 'black' }}>Poll Management</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
