import React, { useState, useEffect } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import './styles.css'

function Setups() {
  const [setups, setSetups] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditingSetup, setCurrentEditingSetup] = useState(null);

  useEffect(() => {
    fetch('/user-setups')
      .then(res => res.json())
      .then(data => setSetups(data))
      .catch(error => console.error('Error fetching setups:', error));
  }, []);

  function handleDelete(setupId) {
    // Show confirmation prompt
    if (window.confirm("Are you sure you want to delete this setup?")) {
        fetch(`/delete-setup/${setupId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Update setups state to remove the deleted setup
                setSetups(prevSetups => prevSetups.filter(setup => setup.id !== setupId));
            } else {
                console.error(data.message);
            }
        })
        .catch(error => console.error('Error deleting setup:', error));
    }
}

  function handleEdit(setupId) {
    setIsEditing(true);
    const setupToEdit = setups.find(setup => setup.id === setupId);
    setCurrentEditingSetup(setupToEdit);
  }

  return (
    <div className='setups-container'>
      {setups.map((setup, index) => (
        <div key={index} className="setup-card">
          <div className='card-header'>
            <h3>Setup {index + 1}</h3>
            <AiFillEdit className='edit-icon' size={24} onClick={() => handleEdit(setup.id)} />
            <AiFillDelete className='delete-icon' onClick={() => handleDelete(setup.id)} />
          </div>
          <div className="setup-items">
            {setup?.setup_items?.map(item => (
              <div key={item.item.id} className="item-card" style={{ gridArea: item.item.slot.toLowerCase() }}>
                <img src={item.item.image} alt={item.item.name} />
                <p>{item.item.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Setups;