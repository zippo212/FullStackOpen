
const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <span style={{display:'block'}}>{`capital ${country.capital}`}</span>
        <span style={{display:'block'}}>{`area ${country.area}`}</span>
      </div>
      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

const CountriesView = ({countries}) => {

  if (countries.length === 1) return <Country country={countries[0]}/>  
  
  return (
    <div>
      {countries.map(country => 
        <div key={country.name.common} style={{marginBottom: 2 , fontSize: 18}}>
          {country.name.common}
        </div> 
      )}
    </div>
  )
}

export default CountriesView