import React from 'react'

const Otsikko = ({nimi}) => <h1>{nimi}</h1>

const Sisalto = ({osat}) => <div>{osat.map(osa => <Osa osa={osa} key={osa.id}/>)}</div>

const Osa = ({osa}) => <p>{osa.nimi} {osa.tehtavia}</p>

const Yhteensa = ({osat}) => {
  const lkm = osat.map(osa => osa.tehtavia).reduce((a, b) => a + b);
  return(
    <div>
      <p>yhteensä {lkm} tehtävää</p>
    </div>
  )
}

const Kurssi = ({kurssi}) => {
  return(
    <div>
      <Otsikko nimi={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa osat={kurssi.osat}/>
    </div>
  )
}

export default Kurssi