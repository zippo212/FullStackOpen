import axios from "axios"
import { useState } from "react"

const Country = ({country}) => {
  const [weather, setWeather] = useState(null)
  if (!weather) {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)
      .then(res => setWeather(res.data))
  }
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
      <img src={country.flags.png} alt={country.flags.alt} style={{border: 'solid'}}/>
      <h4>Weather in {country.capital}</h4>
      {weather && 
        <div>
          <span style={{display:'block'}}>{`temperature ${weather.main.temp} Celsius`}</span>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <span style={{display:'block'}}>{`wind ${weather.wind.speed} m/s`}</span>
        </div>
      }
    </div>
  )
}

const CountriesView = ({countries}) => {
  const [showCountry, setShowCountry] = useState([])
  if (countries.length === 1) return <Country country={countries[0]}/>  

  function handleClick(name) {
    if (!showCountry.includes(name)) {
      setShowCountry(showCountry.concat(name))
    } else setShowCountry(showCountry.filter(c => c !== name))
  }
  
  return (
    <div>
      {countries.map(country => 
        <div key={country.name.common} style={{marginBottom: 2 , fontSize: 18}}>
          {country.name.common}
          <button onClick={() => handleClick(country.name.common)}>
            {showCountry.includes(country.name.common) ? 'hide' : 'show'}
          </button>
          {showCountry.includes(country.name.common) && <Country country={country}/>}
        </div> 
      )}
    </div>
  )
}

export default CountriesView