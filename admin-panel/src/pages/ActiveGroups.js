import React, { useState } from "react";
import "./ActiveGroups.css";

const ActiveGroups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  const groups = [
    { id: 1, name: "Group A" },
    { id: 2, name: "Group B" },
    { id: 3, name: "Group C" },
    { id: 4, name: "Group D" },
    { id: 5, name: "Group E" },
  ];

  const filteredGroups = groups.filter((group) =>
    group.name.replace(/\s+/g, "").toLowerCase().includes(searchQuery.replace(/\s+/g, "").toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleButtonClick = (group, tab) => {
    setSelectedGroup(group);
    setSelectedTab(tab);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setSelectedTab(null);
  };

  const renderDetails = () => {
    if (!selectedGroup || !selectedTab) return null;

    const groupData = {
      quizzes: [
        { id: 1, title: `${selectedGroup.name} - Quiz 1`, date: "2024-12-05" },
        { id: 2, title: `${selectedGroup.name} - Quiz 2`, date: "2024-12-07" },
      ],
      polls: [
        { id: 1, title: `${selectedGroup.name} - Poll 1`, date: "2024-12-06" },
        { id: 2, title: `${selectedGroup.name} - Poll 2`, date: "2024-12-08" },
      ],
      announcements: [
        { id: 1, title: `${selectedGroup.name} - Announcement 1`, date: "2024-12-04" },
        { id: 2, title: `${selectedGroup.name} - Announcement 2`, date: "2024-12-07" },
      ],
    };

    return (
      <div className="details-section">
        <button onClick={handleBackToGroups} className="back-button">
          Back to Groups
        </button>
        <h3>
          {selectedGroup.name} - {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
        </h3>
        <ul>
          {groupData[selectedTab].map((item) => (
            <li key={item.id}>
              {item.title} - {item.date}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container">
      <h2>Active Groups</h2>
      {!selectedGroup ? (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for a group..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="groups-grid">
            {filteredGroups.map((group) => (
              <div className="group-card" key={group.id}>
                <h4>{group.name}</h4>
                <div className="button-group">
                  <button onClick={() => handleButtonClick(group, "quizzes")}>Quiz</button>
                  <button onClick={() => handleButtonClick(group, "polls")}>Poll</button>
                  <button onClick={() => handleButtonClick(group, "announcements")}>Announcement</button>
                </div>
              </div>
            ))}
            {filteredGroups.length === 0 && (
              <p style={{ textAlign: "center", color: "#777" }}>
                No groups found matching "{searchQuery}".
              </p>
            )}
          </div>
        </>
      ) : (
        renderDetails()
      )}
    </div>
  );
};

export default ActiveGroups;
