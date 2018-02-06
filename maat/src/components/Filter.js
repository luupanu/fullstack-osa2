import React from 'react'

const Filter = ({inputRef, value, handleChange}) => {
  return(
    <div>
      find countries: <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default Filter