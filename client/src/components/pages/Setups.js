import React, { useState, useEffect } from 'react'
import './styles.css'

function Setups() {
  const [setups, setSetups] = useState([])

  useEffect(() => {
    fetch('/user-setups')
      .then(res => res.json())
      .then(data => setSetups(data))
      .catch(error => console.error('Error fetching setups:', error));
  }, []);

  return (
    <div>
      {setups.map((setup, index) => (
        <div key={index} className="setup-card">
          <h3>Setup {index + 1}</h3>
          <div className="setup-items">
            {setup.items.map(item => (
              <div key={item.id} className="item-card">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Setups;