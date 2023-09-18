import React from 'react'
import './styles.css'
import SlotDropdown from './Dropdown';

function AddSetup() {
  return (
    <div className="center-container">
      <div>
        <h1>Title</h1>
        <input type="text"/>
      </div>
      <div>
        <h3>Head</h3>
        <SlotDropdown slot="head"/>
      </div>
      <div>
        <h3>Cape</h3>
        <SlotDropdown slot="cape"/>
      </div>
      <div>
        <h3>Neck</h3>
        <SlotDropdown slot="neck"/>
      </div>
      <div>
        <h3>Ammo</h3>
        <SlotDropdown slot="ammo"/>
      </div>
      <div>
        <h3>Weapon</h3>
        <SlotDropdown slot="weapon"/>
      </div>
      <div>
        <h3>Body</h3>
        <SlotDropdown slot="body"/>
      </div>
      <div>
        <h3>Shield</h3>
        <SlotDropdown slot="shield"/>
      </div>
      <div>
        <h3>Legs</h3>
        <SlotDropdown slot="legs"/>
      </div>
      <div>
        <h3>Hands</h3>
        <SlotDropdown slot="hands"/>
      </div>
      <div>
        <h3>Feet</h3>
        <SlotDropdown slot="feet"/>
      </div>
      <div>
        <h3>Ring</h3>
        <SlotDropdown slot="ring"/>
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