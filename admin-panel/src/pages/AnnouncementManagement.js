import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AnnouncementManagement = () => {
  const [creatingAnnouncement, setCreatingAnnouncement] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "", file: null });

 

  // Fetch announcements from the backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/announcements');
        console.log("Announcements Fetched:", response.data);
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error.message);
      }
    };
    fetchAnnouncements();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement({ ...newAnnouncement, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewAnnouncement({ ...newAnnouncement, file: e.target.files[0] });
  };

  const handlePost = async () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      try {
        const formData = new FormData();
        formData.append('title', newAnnouncement.title);
        formData.append('content', newAnnouncement.content);
        if (newAnnouncement.file) {
          formData.append('file', newAnnouncement.file);
        }
  
        const response = await axios.post('http://localhost:5000/api/announcements', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        if (response.status === 201) {
          setAnnouncements([response.data, ...announcements]);
          setNewAnnouncement({ title: "", content: "", file: null });
          setCreatingAnnouncement(false);
        } else {
          alert("Failed to post announcement. Please try again.");
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        alert("Error: " + (error.response?.data?.message || "Failed to post announcement."));
      }
    } else {
      alert("Please fill in all the fields!");
    }
  };
  

  const handleCancel = () => {
    setNewAnnouncement({ title: "", content: "", file: null });
    setCreatingAnnouncement(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      {creatingAnnouncement ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}>
          <input
            type="text"
            name="title"
            placeholder="Announcement Title"
            value={newAnnouncement.title}
            onChange={handleInputChange}
            style={{ width: '300px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <textarea
            name="content"
            placeholder="Announcement Content"
            value={newAnnouncement.content}
            onChange={handleInputChange}
            style={{ width: '300px', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="file"
            onChange={handleFileChange}
            style={{ border: 'none', padding: '5px' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handlePost} style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Post Announcement</button>
            <button onClick={handleCancel} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Link to="#" style={{ textDecoration: 'none' }} onClick={() => setCreatingAnnouncement(true)}>
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
              cursor: 'pointer',
              marginBottom: '20px'
            }}>
              <div style={{
                fontSize: '40px',
                color: '#4caf50',
                marginBottom: '10px'
              }}>📝</div>
              <h3 style={{ margin: '0', fontSize: '18px', color: '#333' }}>Create Announcement</h3>
            </div>
          </Link>
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <h3>Recent Announcements</h3>
            {announcements.length > 0 ? (
              announcements.map((announcement, index) => (
                <div key={index} style={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  padding: '15px',
                  marginBottom: '10px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                }}>
                  <h4 style={{ margin: '0 0 5px' }}>{announcement.title}</h4>
                  <p style={{ margin: '0 0 5px', color: '#555' }}>{announcement.content}</p>
                  <small style={{ color: '#999' }}>Posted on: {announcement.date}</small>
                </div>
              ))
            ) : (
              <p>No announcements yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementManagement;
