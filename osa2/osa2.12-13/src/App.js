import React, { Component } from 'react';
import './App.css';
import FilterView from './components/FilterView'
import CountriesList from './components/CountriesList'
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  handleClick = (country) => {
    console.log(country)
    return () => {
      console.log(country)
      this.setState({filter: country})
    }
  }

  render() {
    const filteredCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    
    return (
      <div className="App">
        <FilterView state={this.state} changeFunc={this.handleChange} />
        <CountriesList countries={filteredCountries} clickFunc={this.handleClick.bind(this)} />
      </div>
    );
  }
}

export default App;
