import React from 'react'

const Data = (props) => {

    let countries = []

    if (props.filter.length > 0) {
        countries = props.countries.filter(person => person.name.toUpperCase().includes(props.filter.toUpperCase()))
    }
    else {
        countries = props.countries
    }

    if (props.filter.length === 0 && countries.length > 1) {
        return (
            <div></div>
        )
    }
    else if (countries.length > 10) {
        return (
            <div>Too many matches. Specify another filter.</div>
        )
    }
    else if (countries.length === 1) {
        return (
            countries.map(country =>
                <div key={country.name}>
                    <h2>{country.name}</h2>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population}</p>
                    <img width="200px"
                        src={country.flag} alt=""
                    />
                </div>
            )
        )
    }
    else {
        return (
            countries.map(country =>
                <div key={country.name} onClick={e => props.countryClick(e, country.name)}>
                    {country.name}
                </div>
            )
        )
    }

}

export default Data