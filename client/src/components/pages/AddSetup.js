import React, { useState } from 'react'
import './styles.css'

function AddSetup() {
  return (
    <div className="center-container">
      <div>
        <h1>Title</h1>
        <input type="text"/>
      </div>
      <div>
        <h3>Head</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Cape</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Neck</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Ammo</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Weapon</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Body</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Shield</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Legs</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Hands</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Feet</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Ring</h3>
        <input type="text"/>
      </div>
      <div>
        <h3>Description</h3>
        <textarea 
          rows={7}
          cols={35}
        />
      </div>
      <button>Add Setup</button>
    </div>
  );
}

export default AddSetup;