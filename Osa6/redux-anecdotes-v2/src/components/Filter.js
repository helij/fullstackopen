import React from 'react'
import { filter } from './../reducers/filterReducer'
import { connect } from 'react-redux'
/* eslint-disable react/react-in-jsx-scope */
class Filter extends React.Component {
    handleChange = (event) => {
      // input-kentän arvo muuttujassa event.target.value
      this.props.filter(event.target.value)
    }
    render() {
      const style = {
        marginBottom: 10,
        marginTop: 20
      }

      return (<div style={style}>
            filter <input onChange={this.handleChange} />
      </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}


const ConnectedFilter = connect(
  mapStateToProps,
  { filter }
)(Filter)

export default ConnectedFilter