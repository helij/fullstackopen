import React from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Data from './components/Data'

class App extends React.Component {

    originalCountries = []
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ''
        }
    }

    componentDidMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                this.setState({ countries: response.data })
                this.originalCountries = response.data
            })
    }

    handleFilter = (event) => {
        if (this.state.countries.length === 1) {
            this.setState({
                countries: this.originalCountries,
                filter: event.target.value
            })
        } else {
            this.setState({
                filter: event.target.value
            })
        }
    }

    handleCountryClick = (event, name) => {
        const result = this.state.countries.filter(country => country.name === name);
        this.setState({
            countries: result,
            filter: ''
        })
    }

    render() {
        return (
            <div>
                <Filter value={this.state.filter} change={this.handleFilter} />
                <Data countries={this.state.countries} filter={this.state.filter} countryClick={this.handleCountryClick} />
            </div>

        )
    }
}

export default App