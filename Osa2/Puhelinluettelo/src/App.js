import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    name: 'Arto Hellas'
                },
                {
                    name: 'Esko Ukkonen'
                }
            ],
            newName: ''
        }
    }

    addName = (event) => {
        event.preventDefault()
        if (!this.state.persons.map(person=>person.name).includes(this.state.newName)) {
            const noteObject = {
                name: this.state.newName,
            }
            const persons = this.state.persons.concat(noteObject)
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


    handleNoteChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addName}>
                    <div>
                        nimi: <input
                            value={this.state.newNote}
                            onChange={this.handleNoteChange}
                        />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                {this.state.persons.map(person =>
                    <div key={person.name}>
                        {person.name}
                    </div>
                )}

            </div>

        )
    }
}

export default App