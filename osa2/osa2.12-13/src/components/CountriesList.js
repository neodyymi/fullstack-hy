import React from 'react'

const CountriesList = ({countries, clickFunc}) => {


  if(countries.length>10) {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )
  } else if(countries.length<1) {
    return (
      <div>
        No matching countries, change your filter.
      </div>
    )
  } else if(countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h3>{country.name} {country.nativeName}</h3>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <img width="30%" alt={country.name} src={country.flag} />
      </div>
    )
  } else {
    return (
      <div>
        <h3>Countries</h3>
        <ul>
          {countries.map(country => (
            <li key={country.name} name={country.name} onClick={clickFunc(country.name) }>
              {country.name}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default CountriesList