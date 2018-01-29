import React from 'react'

const Puhelinluettelo = ({persons}) => {

  return (
    <div>
      <h3>Numerot</h3>
      <table>
        <tbody>
          {persons.map(person => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Puhelinluettelo