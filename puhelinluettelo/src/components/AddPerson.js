import React from 'react'

const AddPerson = ({newName, newNumber, handleNameChange, handleNumberChange, handleSubmit}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div>
        nimi: <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        numero: <input
          type="text"
          value={newNumber}
          onChange={handleNumberChange}
          required
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default AddPerson