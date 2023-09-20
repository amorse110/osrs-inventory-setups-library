import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';
import SlotDropdown from './Dropdown';

function EditSetupForm({ currentSetup }) {
    const location = useLocation();

    const initialSetup = location.state?.setup || currentSetup || {};

    const [title, setTitle] = useState(initialSetup.title || "");
    const [description, setDescription] = useState(initialSetup.description || "");
    const defaultItems = {
        head: null,
        cape: null,
        neck: null,
        ammo: null,
        weapon: null,
        body: null,
        shield: null,
        legs: null,
        hands: null,
        feet: null,
        ring: null,
    };
    const [selectedItems, setSelectedItems] = useState({ ...defaultItems, ...initialSetup.items });

    if (!initialSetup.id) return <div>Loading setup...</div>;

    function handleEditSubmit(event) {
        event.preventDefault();

        const setupData = {
            title,
            description,
            ...selectedItems
        };
        
        if (currentSetup && currentSetup.id) {
            fetch(`/edit-setup/${currentSetup.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(setupData)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            console.error('Error: currentSetup.id is not available');
        }
    }

    console.log("Selected Items:", selectedItems);

    return (
        <form className="center-container" onSubmit={handleEditSubmit}>
            <h1>Edit Setup</h1>
            <label><strong>Title:</strong></label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            {["head", "cape", "neck", "ammo", "weapon", "body", "shield", "legs", "hands", "feet", "ring"].map(slot => (
                <React.Fragment key={slot}>
                    <label><strong>{slot.charAt(0).toUpperCase() + slot.slice(1)}:</strong></label>
                    <SlotDropdown 
                        slot={slot} 
                        selectedItem={selectedItems[slot]} 
                        onItemSelect={(slot, item) => {
                            setSelectedItems(prevItems => ({ ...prevItems, [slot]: item }));
                        }}
                    />
                </React.Fragment>    
            ))}
            <label><strong>Description:</strong></label>
            <textarea 
                rows={7}
                cols={35}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Confirm Edits</button>
        </form>
    );
}

export default EditSetupForm;