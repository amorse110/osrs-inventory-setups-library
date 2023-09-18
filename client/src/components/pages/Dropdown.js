import React, { useEffect, useState } from 'react';

function SlotDropdown({ slot }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5555/items/' + slot)
            .then(res => res.json())
            .then(data => setItems(data));
    
    }, [slot]);

    return (
        <select>
            {items.map(item => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    );
}

export default SlotDropdown;