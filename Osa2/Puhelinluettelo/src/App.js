import React from 'react';
import Filter from './components/Filter'
import Data from './components/Data'
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''

        }
    }

    componentDidMount() {
        personService.getAll()
            .then(persons => {
                this.setState({ persons })
            })
    }


    addName = (event) => {
        event.preventDefault()
        if (!this.state.persons.map(person => person.name).includes(this.state.newName)) {
            const personObject = {
                name: this.state.newName,
                number: this.state.newNumber
            }
            personService.create(personObject)
                .then(response => {
                    const persons = this.state.persons.concat(response)
                    this.setState({
                        persons
                    })
                })
        }
        else {
            alert("Nimi löytyy jo!")
        }
    }


    handleDelete = (event, person) => {
        event.preventDefault()
        if (window.confirm("poistetaanko " + person.name)) {
            personService.deletePerson(person.id)
                .then(response => {
                    const persons = this.state.persons.filter(p => p.id !== person.id);
                    this.setState({
                        persons
                    })
                })
        }

    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilter = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Filter value={this.state.filter} change={this.handleFilter} />
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addName}>
                    <div>
                        nimi: <input
                            value={this.state.newName}
                            onChange={this.handleNameChange}
                        />
                    </div>
                    <div>
                        numero: <input
                            value={this.state.newNumber}
                            onChange={this.handleNumberChange}
                        />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>

                </form>
                <h2>Numerot</h2>
                <Data persons={this.state.persons} filter={this.state.filter} handleDelete={this.handleDelete} />
            </div>

        )
    }
}

export default App