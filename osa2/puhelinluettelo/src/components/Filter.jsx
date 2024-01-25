import React from 'react'

const Filter = ({ filterContacts }) => {
    return (
      <div>
        filter people: <input onChange={filterContacts} />
      </div>
    )
  }
  
  export default Filter