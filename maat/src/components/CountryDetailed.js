import React from 'react'

const CountryDetailed = ({name, capital, population, flag}) => {
  return(
    <div>
      <h1>{name}</h1>
      <p>capital: <b>{capital}</b></p>
      <p>population: <b>{population}</b></p>
      <img src={flag} alt={"the flag of " + name}/>
    </div>
  )
}

export default CountryDetailed