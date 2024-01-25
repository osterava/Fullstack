import React from 'react'

const Contacts = ({ contacts, handleDelete }) => {
  return (
    <div>
      {contacts.map((contact) => {
        return (
          <p key={contact.name}>
            {contact.name} {contact.number}  <button
              onClick={
                () => handleDelete(
                  contact.id,
                  contact.name)}>
              Delete
            </button>

          </p>
        )
      })}
    </div>
  )
}

export default Contacts