import React from 'react'

const Kurssi = ({kurssi}) => {
  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto sisalto={kurssi.osat} />
      <Yhteensa sisalto={kurssi.osat} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi.nimi}</h1>
  )
}

const Sisalto = (props) => {
  var osat = props.sisalto.map(osa => {
    return (
      <Osa key={osa.id} osa={osa}/>
    )
  })
  return (
    <div>
      {osat}
    </div>
  )
}

const Osa = (props) => {
  return (
    <p>
    {props.osa.nimi} {props.osa.tehtavia}
    </p>
  )
}

const Yhteensa = (props) => {
  const summa = props.sisalto.reduce((sum, osa) => sum + osa.tehtavia, 0)
  return (
    <p>
      yhteensä {summa} tehtävää
    </p>
  )
}


export default Kurssi