import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import SlotDropdown from './Dropdown';

function EditSetupForm({ currentSetup }) {
    const {setupId} = useParams();

    // const initialSetup = location.state?.setup || currentSetup || {};

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [setupItems, setSetupItems] = useState({
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
    });
    // const [selectedItems, setSelectedItems] = useState({ ...defaultItems, ...initialSetup.items });

    
    useEffect(() => {
        fetch(`/edit-setup/${setupId}`)
        .then(res => res.json())
        .then(setup => {
            setTitle(setup.title)
            setDescription(setup.description)
            setSetupItems({
                head: setup.setup_items.find(si => si.item.slot == 'head')?.item,
                cape: setup.setup_items.find(si => si.item.slot == 'cape')?.item,
                neck: setup.setup_items.find(si => si.item.slot == 'neck')?.item,
                ammo: setup.setup_items.find(si => si.item.slot == 'ammo')?.item,
                weapon: setup.setup_items.find(si => si.item.slot == 'weapon')?.item,
                body: setup.setup_items.find(si => si.item.slot == 'body')?.item,
                shield: setup.setup_items.find(si => si.item.slot == 'shield')?.item,
                legs: setup.setup_items.find(si => si.item.slot == 'legs')?.item,
                hands: setup.setup_items.find(si => si.item.slot == 'hands')?.item,
                feet: setup.setup_items.find(si => si.item.slot == 'feet')?.item,
                ring: setup.setup_items.find(si => si.item.slot == 'ring')?.item,
                })
            })
        }, [setupId])
        
        function handleEditSubmit(event) {
        event.preventDefault();
        
        const setupData = {
            title,
            description,
            // ...selectedItems
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

    if (!title) return <div>Loading setup...</div>;

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
                        setupItems={setupItems}
                        setSetupItems={setSetupItems} 
                        // onItemSelect={(slot, item) => {
                        //     setSelectedItems(prevItems => ({ ...prevItems, [slot]: item }));
                        // }}
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