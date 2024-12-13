import React from 'react';
import { Link } from 'react-router-dom';

const QuizManagement = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      flexWrap: 'wrap'
    }}>
      {/* Create Quiz Card */}
      <Link to="/create-quiz" style={{ textDecoration: 'none' }}>
        <div style={{
          width: '250px',
          height: '150px',
          backgroundColor: '#f4f4f4',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer'
        }}>
          <div style={{
            fontSize: '40px',
            color: '#4caf50',
            marginBottom: '10px'
          }}>+</div>
          <h3 style={{ margin: '0', fontSize: '18px', color: '#333' }}>Create Quiz</h3>
        </div>
      </Link>

      {/* Post Quiz Card */}
      <Link to="/post-quiz" style={{ textDecoration: 'none' }}>
        <div style={{
          width: '250px',
          height: '150px',
          backgroundColor: '#f4f4f4',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer'
        }}>
          <div style={{
            fontSize: '40px',
            color: '#2196f3',
            marginBottom: '10px'
          }}>📤</div>
          <h3 style={{ margin: '0', fontSize: '18px', color: '#333' }}>Post Quiz</h3>
        </div>
      </Link>
    </div>
  );
};

export default QuizManagement;
