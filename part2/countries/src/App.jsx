import { useState } from "react"
import CountriesView from "./CountriesView"
import Search from "./Search"
import axios from "axios"


const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])

  function handleSearchChange (e) {
    const value = e.target.value
    setSearchValue(value)

    if (value === '') return
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((res) => setCountries(res.data))
  }

  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(searchValue.toLowerCase()))
  return (
    <div>
      <Search value={searchValue} handleInput={handleSearchChange}/>
      {searchValue === ''
        ? 
        <></>
        :
        countriesToShow.length > 10 
        ?
        <span>Too many matches, specify another filter</span>
        :
        <CountriesView countries={countriesToShow}/>
      }
    </div>
  )
}

export default App