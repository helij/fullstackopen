import React from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

class App extends React.Component {

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Filter store={this.props.store} />
        {this.props.store.getState().notification.length > 0 &&
          <Notification store={this.props.store} />
        }
        <AnecdoteList store={this.props.store} />
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default App