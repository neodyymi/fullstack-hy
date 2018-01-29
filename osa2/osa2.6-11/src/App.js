import React from 'react';
import Puhelinluettelo from './components/Puhelinluettelo'
import AddPersonForm from './components/AddPersonForm'
import FilterView from './components/FilterView'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      filter: ''
    }
  }
  componentWillMount() {
    console.log('will mount')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
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
