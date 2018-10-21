import React from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Data from './components/Data'

class App extends React.Component {
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
          })
      }
    
    handleFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        return (
            <div>
                <Filter value={this.state.filter} change={this.handleFilter} />
                <Data countries={this.state.countries} filter={this.state.filter} />
            </div>

        )
    }
}

export default App