import React from 'react'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationCreation } from './../reducers/notificationReducer'

class AnecdoteList extends React.Component {


  handleVote = (e, anecdote) => {
    e.preventDefault()
    this.props.store.dispatch(anecdoteVote(anecdote.id))
    this.props.store.dispatch(notificationCreation('You voted anecdote: ' + anecdote.content))
    setTimeout(() => {
      this.props.store.dispatch(notificationCreation(''))
    }, 5000)
  }

  render() {
    console.log(this.props.store.getState())
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

export default AnecdoteList
