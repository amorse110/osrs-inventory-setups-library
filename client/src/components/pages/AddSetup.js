import React, { useState } from 'react'


const slot_types = [
  'ammo', 'body', 'cape', 'feet',
  'hands', 'head', 'legs', 'neck',
  'ring', 'shield', 'weapon'
];


function AddSetup() {
  return (
    <div>
      <div>
        <h1>Head</h1>
        <input type="text"/>
      </div>
      <div>
        <h1>Cape</h1>
        <input type="text"/>
      </div>
      <div>
        <h1>Neck</h1>
        <input type="text"/>
      </div>
      <div>
        <h1>Ammo</h1>
        <input type="text"/>
      </div>
      <div>
        <h1>Weapon</h1>
        <input type="text"/>
      </div>
      <div>
        <h1>Body</h1>
        <input type="text"/>
      </div>
      <div>
        <h1>Shield</h1>
        <input type="text"/>
      </div>
      <div>
        <h1>Legs</h1>
        <input type="text"/>
      </div>
      <div>
        <h1>Hands</h1>
        <input type="text"/>
      </div>
      <div>
        <h1>Feet</h1>
        <input type="text"/>
      </div>
      <div>
        <h1>Ring</h1>
        <input type="text"/>
      </div>
      <button>Add Setup</button>
    </div>
  );
}

export default AddSetup;