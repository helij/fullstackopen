import React from 'react'

const Data = (props) => {
    return (
        props.persons.filter(person => person.name.toUpperCase().includes(props.filter.toUpperCase())).map(person =>
            <div key={person.name}>
                {person.name} {person.number}
            </div>
        )
    )

}

export default Data