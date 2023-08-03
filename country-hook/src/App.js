import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name, setNotification) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {

    if (name) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name.toLowerCase()}`)
        .then(res => setCountry(res.data))
        .catch(error => {
          setCountry("")
          setNotification(error.message)
          setTimeout(() => setNotification(''), 5000)
        })
    }

  }, [name, setNotification])

  //console.log('country:', country)


  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }


  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flags.png} height='100' alt={country.flags.alt} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const [notification, setNotification] = useState("")
  const country = useCountry(name, setNotification)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
      {notification ? <div style={{
        border: 'dotted',
        borderWidth: '2px',
        borderColor: 'yellow',
        backgroundColor: 'yellow',
        color: 'red'
      }}><h4>{notification}</h4></div> : null}
    </div>
  )
}

export default App