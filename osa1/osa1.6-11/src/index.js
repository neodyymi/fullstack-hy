import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    }
  }

  lisaaArvio = (arvio) => () => this.setState({
    [arvio]: this.state[arvio] + 1
  })

  render() {    
    return (
      <div>
        <h2>
          Anna palautetta
        </h2>
        <div>
          <Button 
            handleClick={this.lisaaArvio('hyva')}
            text="Hyvä"
          />
          <Button 
            handleClick={this.lisaaArvio('neutraali')}
            text="Neutraali"
          />
          <Button 
            handleClick={this.lisaaArvio('huono')}
            text="Huono"
          />
        </div>
        <h2>
          Statistiikka
        </h2>
        <div>
          <Statistics statistics={this.state} />
        </div>
         
      </div>
    )
  }
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

class Statistics extends React.Component {
  render() {
    const {statistics} = this.props

    const votes = (statistics.hyva + statistics.neutraali + statistics.huono)
    const ka = Math.round(((statistics.hyva*1 + statistics.neutraali*0 + statistics.huono*-1) / votes)*10) / 10
    const pos = Math.round(((statistics.hyva / votes) * 100)*10)/10 + "%" 
    if(votes === 0) {
      return(
        <div>
          Ei yhtään palautetta annettu.
        </div>
      )
    } else {
      return(
        <div>
          <table>
            <tbody>
            <Statistic statistic="Hyvä" value={statistics.hyva} />
            <Statistic statistic="Neutraali" value={statistics.neutraali} />
            <Statistic statistic="Huono" value={statistics.huono} />
            <Statistic statistic="Keskiarvo" value={ka} />
            <Statistic statistic="Positiivisia" value={pos} />
            </tbody>
          </table>
        </div>
      )
    }
  }
}


const Statistic = ({ statistic, value}) => (
  <tr>
    <td>{statistic}</td><td>{value}</td>
  </tr>
)

ReactDOM.render(
<App />,
document.getElementById('root')
)