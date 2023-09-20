import React, { useState } from 'react'
import './styles.css'
import SlotDropdown from './Dropdown';

function AddSetup() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [selectedItems, setSelectedItems] = useState({
    head: "",
    cape: "",
    neck: "",
    ammo: "",
    weapon: "",
    body: "",
    shield: "",
    legs: "",
    hands: "",
    feet: "",
    ring: ""
  });
  
  function handleSubmit(event) {
    event.preventDefault();
  
    const setupData = {
      title,
      description,
      ...selectedItems
    };
  
    fetch('/add-setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(setupData)
    })
    .then(res => {
      if (res.status === 404) {
        throw new Error('User not logged in');
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
      setErrorMessage("")
    })
    .catch(error => {
      if (error.message === 'User not logged in') {
        setErrorMessage("Please log in or create an account to create a setup")
      } else {
        console.log('Error:', error);
      }
    });
  }


  return (
    <form className="center-container" onSubmit={handleSubmit}>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <h1>Title</h1>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <label><strong>Head</strong></label>
      <SlotDropdown slot="head" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Cape</strong></label>
      <SlotDropdown slot="cape" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Neck</strong></label>
      <SlotDropdown slot="neck" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Ammo</strong></label>
      <SlotDropdown slot="ammo" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Weapon</strong></label>
      <SlotDropdown slot="weapon" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Body</strong></label>
      <SlotDropdown slot="body" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Shield</strong></label>
      <SlotDropdown slot="shield" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Legs</strong></label>
      <SlotDropdown slot="legs" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Hands</strong></label>
      <SlotDropdown slot="hands" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Feet</strong></label>
      <SlotDropdown slot="feet" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Ring</strong></label>
      <SlotDropdown slot="ring" onItemSelect={(slot, item) => {
        setSelectedItems(prevItems => ({ ...prevItems, [slot]: item}))
      }}/>
      <label><strong>Description</strong></label>
      <textarea 
          rows={7}
          cols={35}
          value={description} onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Setup</button>
    </form>
  );
}

export default AddSetup;