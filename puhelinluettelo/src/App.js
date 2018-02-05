import React from 'react'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Person from './components/Person'
import personService from './services/persons'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      message: '',
      newName: '',
      newNumber: '',
      persons: [],
      query: ''
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({persons})
      })
  }

  addOrUpdatePerson = (e) => {
    e.preventDefault()

    const newPerson = {
      name: this.state.newName.trim().replace(/\s+/g, ' '),
      number: this.state.newNumber.trim().replace(/\s+/g, ' '),
    }

    if (!newPerson.name || !newPerson.number) {
      this.setMessage('nimi tai numero ei saa olla tyhjä')
      return
    }
    const person = this.state.persons.find(p => p.name === newPerson.name)

    return person ? this.updatePerson(person.id, newPerson) : this.addPerson(newPerson)
  }

  clearTextFields() {
    this.setState({
      newName: '',
      newNumber: ''
    })
  }

  setMessage = (message) => {
    this.setState({message: message})
    setTimeout(() => {
      this.setState({message: ''})
    }, 5000)
  }

  addPerson = (newPerson) => {
    personService
        .create(newPerson)
        .then(person => {
          this.setState({
            persons: this.state.persons.concat(person),
          })
        })
    this.clearTextFields()
    this.setMessage(`lisättiin ${newPerson.name}`)
  }

  removePerson = (id) => {
    return () => {
      const person = this.state.persons.find(p => p.id === id)
      const result = window.confirm(`poistetaanko ${person.name}`)

      if (result) {
        personService
          .remove(id)
          .then(
            this.setState({
              persons: this.state.persons.filter(p => p.id !== id)
            })
          )
        this.setMessage(`poistettiin ${person.name}`)
      }
    }
  }

  updatePerson = (id, newPerson) => {
    const result = window.confirm(
        `${newPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`
    )
    if (result) {
      personService
        .update(id, newPerson)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.map(p => p.id !== id ? p : newPerson),
          })
        })
      this.clearTextFields()
      this.setMessage(`päivitettiin ${newPerson.name} uudella numerolla (${newPerson.number})`)
    }
  }

  handleChange = (property) => (e) => this.setState({[property]: e.target.value})

  // returns true if some value in obj (other than key === 'id') includes the query string
  // i : case insensitive flag
  someValueIncludesQueryString = (obj, query, i) => {
    const keys = Object.keys(obj).filter(k => k !== 'id')
    // remove first space(s), replace more than one space with just one
    query = query.replace(/^\s+/,'').replace(/\s+/g, ' ')

    const returnable = i ? 
      keys.some(k => obj[k].toLowerCase().includes(query.toLowerCase())) :
      keys.some(k => obj[k].includes(query))
    return returnable
  }

  // do we have a search query? if: filter, if not: don't
  personsToShow = () => {
    const persons = this.state.query.trim() ?
      this.state.persons.filter(p => this.someValueIncludesQueryString(p, this.state.query, true)) :
      this.state.persons
    return(
      persons.map(person => 
        <Person
          key={person.id}
          person={person}
          removePerson={this.removePerson(person.id)}
        />
      )
    )
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.message}/>
        <Filter value={this.state.query} handleChange={this.handleChange('query')}/>
        <h2>Lisää uusi / muuta olemassaolevan numeroa</h2>
        <AddPerson
          newName={this.state.newName}
          newNumber={this.state.newNumber}
          handleNameChange={this.handleChange('newName')}
          handleNumberChange={this.handleChange('newNumber')}
          handleSubmit={this.addOrUpdatePerson}
        />
        <h2>Numerot</h2>
        <table>
          <thead>
            {this.personsToShow()}
          </thead>
        </table>
      </div>
    )
  }
}

export default App