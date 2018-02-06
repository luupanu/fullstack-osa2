import React from 'react'

const Country = ({name, handleClick}) => {
  return(
    <div onClick={handleClick}>{name}</div>
  )
}

export default Country