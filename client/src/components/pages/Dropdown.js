import React, { useEffect, useState } from 'react';

function SlotDropdown({ slot, onItemSelect, defaultItem }) {
    const [items, setItems] = useState([]);
    const dropdownStyle = { width: '150px' };

    useEffect(() => {
        fetch(`/items/${slot}`)
            .then(res => res.json())
            .then(data => setItems(data));
    
    }, [slot]);

    const handleChange = (event) => {
        const selectedItem = event.target.value;
        handleSelection(selectedItem);
    };

    const handleSelection = (selectedItem) => {
        onItemSelect(slot, selectedItem);
    };
    
    // console.log(`Slot: ${slot}, Selected Item: ${selectedItem}`);
    if (!defaultItem) return (<h1>loading…</h1>)


    return (
        <select style={dropdownStyle} value={defaultItem?.length>1?defaultItem[1]:defaultItem[0]} onChange={handleChange}>
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