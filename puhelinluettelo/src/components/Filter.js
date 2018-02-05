import React from 'react'

const Filter = ({value, handleChange}) => {
  return(
    <div>
      rajaa näytettäviä <input
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter