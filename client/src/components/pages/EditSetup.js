import React from 'react';
import './styles.css';
import SlotDropdown from './Dropdown';

function EditSetupForm({ currentSetup, onEditComplete }) {
    const [title, setTitle] = useState(currentSetup ? currentSetup.title : "");
    const [description, setDescription] = useState(currentSetup ? currentSetup.description : "");
    const [selectedItems, setSelectedItems] = useState(currentSetup ? currentSetup.items : {});

    function handleEditSubmit(event) {
        event.preventDefault();

        const setupData = {
            title,
            description,
            ...selectedItems
        };

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
            onEditComplete();  // Notify parent component that editing is done.
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <form className="center-container" onSubmit={handleEditSubmit}>
            <h1>Edit Setup</h1>
            <label><strong>Title:</strong></label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <label><strong>Description:</strong></label>
            <textarea 
                rows={7}
                cols={35}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {["head", "cape", "neck", "ammo", "weapon", "body", "shield", "legs", "hands", "feet", "ring"].map(slot => (
            <>
                <label key={slot + "-label"}><strong>{slot.charAt(0).toUpperCase() + slot.slice(1)}:</strong></label>
                <SlotDropdown 
                    key={slot + "-dropdown"}
                    slot={slot} 
                    selectedItem={selectedItems[slot]} 
                    onItemSelect={(slot, item) => {
                        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item }));
                    }}
                />
            </>
        ))}

            <button type="submit">Confirm Edits</button>
        </form>
    );
}

export default EditSetupForm;