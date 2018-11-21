import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationCreation } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {


  handleVote = (e, anecdote) => {
    e.preventDefault()
    this.props.anecdoteVote(anecdote.id)
    this.props.notificationCreation('You voted anecdote: ' + anecdote.content)
    setTimeout(() => {
      this.props.notificationCreation('')
    }, 5000)
  }

  render() {
  
    const anecdotes = this.props.anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).filter(anecdote => anecdote.content.toUpperCase().includes(this.props.filter.toUpperCase())).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={e => this.handleVote(e, anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
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

const ConnectedAnecdoteListr = connect(
  mapStateToProps,
  { anecdoteVote,  notificationCreation }
)(AnecdoteList)

export default ConnectedAnecdoteListr
