import React from 'react'

const Filter = (props) => {
    return (
        <div>
            Find countries: <input
                value={props.value}
                onChange={props.change}
            />
        </div>
    )
    
  }

  export default Filter