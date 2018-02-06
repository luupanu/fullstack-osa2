import React from 'react'
import Country from './components/Country'
import CountryDetailed from './components/CountryDetailed'
import Filter from './components/Filter'
import countriesService from './services/countries'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      countries: [],
      query: ''
    }
  }

  componentDidUpdate() {
    this.filter.focus() // always keep focus on the filter input field
  }

  componentWillMount() {
    let idCounter = 1;

    countriesService
      .getAll()
      .then(countries => {
        countries.forEach(i => i.id = idCounter++)
        this.setState({countries})
      })
  }

  countriesToShow() {
    const filtered = this.state.countries.filter(c => 
      c.name.toLowerCase().includes(this.state.query.trim().toLowerCase()))
    filtered.sort((a, b) => a.name > b.name ? 1 : -1)

    return filtered.length === 1 ?
      filtered.map(c => 
        <CountryDetailed
          name={c.name}
          capital={c.capital}
          population={c.population}
          flag={c.flag}
          key={c.id}
        />) :
      filtered.length > 10 ?
      <span>too many matches, specify another filter</span> :
      filtered.map(c => <Country name={c.name} handleClick={this.handleClick(c.name)} key={c.id}/>)
  }

  handleClick = (name) => { return () => this.setState({query: name}) }

  handleFilterChange = (e) => this.setState({query: e.target.value})

  render() {
    return(
      <div>
        <Filter
          inputRef={e => this.filter = e}
          value={this.state.query}
          handleChange={this.handleFilterChange}
        />
        <br/>
        {this.countriesToShow()}
      </div>
    )
  }
}

export default App