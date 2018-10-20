import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    name: 'Arto Hellas',
                    number:'040-123456'
                },
                {
                    name: 'Esko Ukkonen',
                    number:'09-546272'
                }
            ],
            newName: '',
            newNumber: ''

        }
    }

    addName = (event) => {
        event.preventDefault()
        if (!this.state.persons.map(person=>person.name).includes(this.state.newName)) {
            const personObject = {
                name: this.state.newName,
                number: this.state.newNumber
            }
            const persons = this.state.persons.concat(personObject)
            this.setState({
                persons
            })
        }
        else{
            alert("Nimi löytyy jo!")
        }
        console.log('event.target.', event.target)
        console.log('event.target.value', event.target.value)
    }


    handleNameChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        console.log(event.target.value)
        this.setState({ newNumber: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
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
                {this.state.persons.map(person =>
                    <div key={person.name}>
                        {person.name} {person.number} 
                    </div>
                )}

            </div>

        )
    }
}

export default App