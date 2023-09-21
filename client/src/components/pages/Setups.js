import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import './styles.css'
import SlotDropdown from './Dropdown';

function Setups() {
  // const history = useHistory();
  const [setups, setSetups] = useState([])
  const [editingSetupId, setEditingSetupId] = useState(null);////////   ADDED ALL STATE 10-15
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedItems, setUpdatedItems] = useState({
      head: "", cape: "", neck: "", ammo: "", weapon: "", body: "", shield: "", legs: "", hands: "", feet: "", ring: ""
    });

  useEffect(() => {
    getSetups()
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

const handleEditSetup = (setupId) => {              //////////  ADDED ENTIRE THING
  const setupToEdit = setups.find(setup => setup.id === setupId);
  setUpdatedTitle(setupToEdit.title);
  setUpdatedDescription(setupToEdit.description);
  setEditingSetupId(setupId);
  let updatedItems = {}
  setupToEdit.setup_items.forEach(si => (
    updatedItems[si.item.slot]=[si.item.id]
  ))
  setUpdatedItems(updatedItems)
};

const handleConfirmEdit = () => {           /////////    ADDED ENTIRE THING
  fetch(`/edit-setup/${editingSetupId}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: updatedTitle,
        description: updatedDescription,
        setup_items: Object.entries(updatedItems)
    })
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      } else {
          throw new Error('Failed to update setup');
      }
  })
  .then(updatedSetup => {
      // Update the local setups state with the edited setup data
      setSetups(prevSetups => {
        return prevSetups.map(setup => {
            if (setup.id === editingSetupId) {
                return {
                    ...updatedSetup,
                    setup_items: Object.entries(updatedItems).map(([slot, item]) => ({ slot, item: { ...item, slot } }))
                };
            } else {
                return setup;
            }
        });
    });
      // Reset the editing state
      setEditingSetupId(null);
      setUpdatedTitle("");
      setUpdatedDescription("");
      setUpdatedItems({
          head: "", cape: "", neck: "", ammo: "", weapon: "", body: "", shield: "", legs: "", hands: "", feet: "", ring: ""
      });
      getSetups()
  })
  .catch(error => {
      console.error('Error updating setup:', error);
      alert('Error updating setup. Please try again.');
  });
};
console.log('Setups Data:', setups);

  function getSetups() {
    fetch('/user-setups')
      .then(res => res.json())
      .then(data => setSetups(data))
      .catch(error => console.error('Error fetching setups:', error));
  }
  

return (        ///////////////    ADDED ENTIRE RETURN
  <div className='setups-container'>
      {setups.map((setup) => (
          <div key={setup.id} className="setup-card">
              {editingSetupId === setup.id ? (
                  <>
                      <input
                          type="text"
                          value={updatedTitle}
                          onChange={e => setUpdatedTitle(e.target.value)}
                      />
                      <div className="setup-items">
                          {/* This will render dropdowns for every slot, pre-filled with the current setup's item. */}
                          {Object.entries(updatedItems).map(slot => (
                              <div key={slot[0]}>
                                  <label><strong>{slot[0].charAt(0).toUpperCase() + slot[0].slice(1)}</strong></label>
                                  <SlotDropdown
                                      slot={slot[0]}
                                      onItemSelect={(slot, item) => {
                                          setUpdatedItems(prevItems => ({ ...prevItems, [slot]: [prevItems[slot][0], item] }));
                                      }}
                                      defaultItem={slot[1]}
                                      // defaultItem={setup?.setup_items?.find(item => item.slot && item.slot.toLowerCase() === slot)?.item}
                                  />
                              </div>
                          ))}
                      </div>
                      <label><strong>Description</strong></label>
                      <textarea 
                          rows={7}
                          cols={35}
                          value={updatedDescription}
                          onChange={e => setUpdatedDescription(e.target.value)}
                      />
                      <button onClick={handleConfirmEdit}>Confirm Edits</button>
                  </>
              ) : (
                  <>
                      <div className='card-header'>
                          <h3>{setup.title}</h3>
                          <div className="card-actions">
                              <AiFillEdit className='edit-icon' size={24} onClick={() => handleEditSetup(setup.id)} />
                              <AiFillDelete className='delete-icon' onClick={() => handleDelete(setup.id)} />
                          </div>
                      </div>
                      <div className="setup-items">
                          {setup?.setup_items?.map((item, index) => (
                              <div key={item.item.id + item.item.name + setup.id + index} className="item-card" style={{ gridArea: item.item.slot.toLowerCase() }}>
                                  <img src={item.item.image} alt={item.item.name} />
                                  <p>{item.item.name}</p>
                              </div>
                          ))}
                      </div>
                      <p style={{ marginTop: '10px' }}><strong>Description: </strong>{setup.description}</p>
                  </>
              )}
          </div>
      ))}
  </div>
);
}

//////////////////onClick={() => handleEdit(setup.id)}
//   return (
//     <div className='setups-container'>
//       {setups.map((setup, index) => (
//         <div key={index} className="setup-card">
//           <div className='card-header'>
//             <h3>{setup.title}</h3>
//             <div className="card-actions">
//               <AiFillEdit className='edit-icon' size={24} />
//               <AiFillDelete className='delete-icon' onClick={() => handleDelete(setup.id)} />
//             </div>
//           </div>
//           <div className="setup-items">
//             {setup?.setup_items?.map(item => (
//               <div key={item.item.id} className="item-card" style={{ gridArea: item.item.slot.toLowerCase() }}>
//                 <img src={item.item.image} alt={item.item.name} />
//                 <p>{item.item.name}</p>
//               </div>
//             ))}
//           </div>
//           <p style={{ marginTop: '10px' }}><strong>Description: </strong>{setup.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

export default Setups;