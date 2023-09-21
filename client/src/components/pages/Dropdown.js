import React, { useEffect, useState } from 'react';

function SlotDropdown({ slot, onItemSelect, selectedItem, setupItems, setSetupItems }) {
    const [items, setItems] = useState([]);
    const dropdownStyle = { width: '150px' };

    useEffect(() => {
        fetch(`/items/${slot}`)
            .then(res => res.json())
            .then(data => setItems(data));
    
    }, [slot]);

    const handleChange = (event) => {
        const selectedItem = event.target.value;
        // handleSelection(selectedItem);
    };

    // console.log(`Slot: ${slot}, Selected Item: ${selectedItem}`);
    //22<select style={dropdownStyle} onChange={handleChange} value={setupItems[slot].id || ''}>
    return (
        <select style={dropdownStyle} onChange={handleChange} value={setupItems[slot]?.id || selectedItem || ''}>
            <option value="">None</option>
            {items.map(item => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    );
}

export default SlotDropdown;