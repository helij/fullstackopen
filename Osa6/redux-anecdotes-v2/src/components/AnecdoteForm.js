import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notificationCreation } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
    this.props.notificationCreation('You created new anecdotee: ' + content)
    setTimeout(() => {
      this.props.notificationCreation('')
    }, 5000)
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
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

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  { anecdoteCreation, notificationCreation }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
