import React from 'react'
import Filter from './../components/Filter'
import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notificationCreation } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  handleVote = async (e, anecdote) => {
    e.preventDefault()
    this.props.anecdoteVote({ content: anecdote.content, id: anecdote.id, votes: anecdote.votes + 1 })
    this.props.notificationCreation('You voted anecdote: ' + anecdote.content, 5)
  }

  render() {

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.map(anecdote =>
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

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.sort((a, b) => b.votes - a.votes).filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { anecdoteVote, notificationCreation }
)(AnecdoteList)

export default ConnectedAnecdoteList
