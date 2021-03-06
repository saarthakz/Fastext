import React, { useState, useRef } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import FoundContact from "./FoundContact";

export default function ContactModal({ setModal }) {

  const db = firebase.firestore();
  const [foundContacts, setFoundContacts] = useState([]);
  const contactSearchRef = useRef(null);

  async function findContact(userName) {
    setFoundContacts([]);
    const foundContactsRef = await db.collection("users").where("userName", "==", userName).get();
    foundContactsRef.forEach((contact) => setFoundContacts((prevContacts) => [...prevContacts, contact.data()]));
  };

  return (
    <div className="ModalBackground">
      <div className="ContactModal">
        <div className="CloseButton" onClick={() => setModal(false)}>X</div>
        <div className="InputDiv">
          <input
            type="text"
            placeholder="Search Username"
            ref={contactSearchRef}
          />
          <button onClick={() => findContact(contactSearchRef.current.value)}>Search</button>
        </div>
        <div className="FoundContactsList">
          {foundContacts.map((contact, index) => <FoundContact key={index.toString()} name={contact.name} userName={contact.userName} />)}
        </div>
      </div>
    </div>
  );
};
