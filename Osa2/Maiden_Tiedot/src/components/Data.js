import React from 'react'

const Data = (props) => {

    const countries = props.countries.filter(person => person.name.toUpperCase().includes(props.filter.toUpperCase()))

    if (props.filter.length === 0) {
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
                <div key={country.name}>
                    {country.name}
                </div>
            )
        )
    }

}

export default Data