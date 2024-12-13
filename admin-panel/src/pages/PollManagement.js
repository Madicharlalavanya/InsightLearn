import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PollManagement = () => {
  const [polls, setPolls] = useState([]);  // Store the list of polls
  const [creatingPoll, setCreatingPoll] = useState(false);  // Track if the user wants to create a poll
  const [newPoll, setNewPoll] = useState({ question: "", options: [] });  // Store data for new poll

  // Fetch polls from the backend (assuming there's an endpoint to fetch polls)
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/polls');
        setPolls(response.data);  // Update state with poll data
      } catch (error) {
        console.error("Error fetching polls:", error.message);
      }
    };
    fetchPolls();
  }, []);

  // Handle input changes for creating a poll
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPoll({ ...newPoll, [name]: value });
  };

  // Handle adding options for the poll
  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    const updatedOptions = [...newPoll.options];
    updatedOptions[index] = value;
    setNewPoll({ ...newPoll, options: updatedOptions });
  };

  const handleAddOption = () => {
    setNewPoll({ ...newPoll, options: [...newPoll.options, ""] });
  };

  // Handle posting the poll
  const handlePostPoll = async () => {
    if (newPoll.question && newPoll.options.length > 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/polls', newPoll);
        setPolls([response.data, ...polls]);  // Add new poll to the list
        setCreatingPoll(false);  // Hide poll creation form
        setNewPoll({ question: "", options: [] });  // Clear form fields
      } catch (error) {
        console.error("Error posting poll:", error.message);
      }
    } else {
      alert("Please provide a question and options!");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      flexWrap: 'wrap'
    }}>

      {/* Display Previous Poll Results */}
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h3>Previous Polls</h3>
        {polls.length > 0 ? (
          polls.map((poll, index) => (
            <div key={index} style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '15px',
              marginBottom: '10px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}>
              <h4>{poll.question}</h4>
              <ul>
                {poll.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No polls yet.</p>
        )}
      </div>

      {/* Create Poll Button */}
      {!creatingPoll ? (
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
          }}>📊</div>
          <h3 style={{ margin: '0', fontSize: '18px', color: '#333' }}>Create Poll</h3>
          <button onClick={() => setCreatingPoll(true)} style={{
            padding: '10px 20px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Create Poll</button>
        </div>
      ) : (
        <div style={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <input
            type="text"
            name="question"
            value={newPoll.question}
            onChange={handleInputChange}
            placeholder="Enter Poll Question"
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          {newPoll.options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
              placeholder={`Option ${index + 1}`}
              style={{
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
          ))}
          <button onClick={handleAddOption} style={{
            padding: '10px 20px',
            backgroundColor: '#2196f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Add Option</button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handlePostPoll} style={{
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Post Poll</button>
            <button onClick={() => setCreatingPoll(false)} style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollManagement;