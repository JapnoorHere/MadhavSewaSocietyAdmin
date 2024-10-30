import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DifferentlyAbledForms = () => {
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState('0'); // default status filter

  // Fetch contacts from the backend
  useEffect(() => {
    axios.get('http://localhost:4100/differentlyAbleContactForm')
      .then(response => {
        setContacts(response.data.contacts);
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  // Handle Accept
  const handleAccept = (id) => {
    axios.get(`http://localhost:4100/differentlyAbleContactForm/accept/${id}`)
      .then(() => {
        setContacts(contacts.map(contact => 
          contact._id === id ? { ...contact, status: '1' } : contact
        ));
      })
      .catch(error => console.error('Error accepting contact:', error));
  };

  // Handle Reject
  const handleReject = (id) => {
    axios.get(`http://localhost:4100/differentlyAbleContactForm/reject/${id}`)
      .then(() => {
        setContacts(contacts.map(contact => 
          contact._id === id ? { ...contact, status: '-1' } : contact
        ));
      })
      .catch(error => console.error('Error rejecting contact:', error));
  };

  return (
    <div>
      <main className="container mt-12 p-4">
        <h1 className="text-2xl font-bold mb-4">Differently Abled Forms</h1>
        <div className="flex justify-end space-x-4 mb-6">
          <button onClick={() => setStatus('1')} className="text-sky-500">Accepted forms</button>
          <button onClick={() => setStatus('-1')} className="text-red-500">Rejected forms</button>
          <button onClick={() => setStatus('0')} className="text-gray-500">Pending forms</button>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {contacts.filter(contact => contact.status === status).map((contact) => (
            <div key={contact._id} className="bg-white rounded-lg shadow-lg p-4">
              <a href={contact.img_url} target="_blank" rel="noopener noreferrer">
                <div className="bg-orange-400 hover:bg-white hover:text-black text-white text-center rounded-lg py-2 mb-4 transition-all border border-transparent hover:border-orange-500">
                  <h5>Disability Certificate</h5>
                </div>
              </a>

              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-bold">{contact.name}</h3>
                <p className="text-sm">{contact.dateAndTime}</p>
              </div>

              <p><b>Email:</b> {contact.email}</p>
              <p><b>Phone:</b> {contact.phone}</p>
              <p><b>Gender:</b> {contact.gender}</p>
              <p><b>Father Name:</b> {contact.father}</p>
              <p><b>Mother Name:</b> {contact.mother}</p>
              <p><b>Qualifications:</b> {contact.qualifications}</p>
              <p><b>Percentage of disability:</b> {contact.percentage}</p>
              <p><b>Services Needed:</b> {contact.services}</p>

              {status === '0' && (
                <div className="flex justify-end space-x-2 mt-4">
                  <button onClick={() => handleAccept(contact._id)} className="text-blue-500">Accept</button>
                  <button onClick={() => handleReject(contact._id)} className="text-red-500">Reject</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DifferentlyAbledForms;
