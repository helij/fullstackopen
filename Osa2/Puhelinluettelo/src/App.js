import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    id: 1,
                    name: 'Arto Hellas'
                },
                {
                    id: 2,
                    name: 'Esko Ukkonen'
                }
            ],
            newName: ''
        }
    }

    addName = (event) => {
        event.preventDefault()
        //const persons = this.state.persons.concat({name: })
        //  this.setState({
        //    persons
        //})
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
                debug: {this.state.newName}
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
                    <div key={person.id}>
                        {person.name}
                </div>
                )}
            
      </div>

        )
    }
}

export default App