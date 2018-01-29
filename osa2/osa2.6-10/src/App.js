import React from 'react';
import Puhelinluettelo from './components/Puhelinluettelo'
import AddPersonForm from './components/AddPersonForm'
import FilterView from './components/FilterView'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Martti Tienari', number: '040-23456', id: 2},
        { name: 'Arto Järvinen', number: '040-3456', id: 3},
        { name: 'Lea Kutvonen', number: '040-456', id: 4}
      ],
      newName: '',
      newPhone: '',
      filter: ''
    }
  }

  addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      number: this.state.newPhone,
      id: this.state.persons.length + 1
    }

    if(!this.state.persons.some(p => p.name === nameObject.name)) {
      const persons = this.state.persons.concat(nameObject)

      this.setState({
        persons,
        newName: '',
        newPhone: ''
      })
    } else {
      alert("Name already in list!")
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <FilterView state={this.state} changeFunc={this.handleChange} />
        <AddPersonForm submitFunc={this.addName} state={this.state} changeFunc={this.handleChange}/>
        <Puhelinluettelo persons={filteredPersons}/>
      </div>
    )
  }
}


export default App
