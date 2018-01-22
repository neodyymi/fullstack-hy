import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

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
      <Osa osa={osa}/>
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
