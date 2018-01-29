import React from 'react'
import Kurssi from './components/Kurssi'

const App = ({kurssit}) => {

  return (
    <div>
      {kurssit.map(kurssi => {
        return(
          <Kurssi key={kurssi.id} kurssi={kurssi} />
        )
      })}
    </div>
  )
}

export default App