import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const MostVotes = (props) => {
  var obj = props.points;
  var maxKey = Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
  if (props.voteClicked) {
    return (
      <div>
        <h2>Anecdote with most votes:</h2>
        {props.anecdotes[maxKey]}<br></br>
        has {props.points[maxKey]} votes
      </div>
    )
  }
  else {
    return (
      <div>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      voteClicked: false
    }
  }



  klikButton = (endValue) => {
    return () => {
      this.setState({
        selected: Math.floor(Math.random() * endValue),
      })
    }
  }

  klikVoteButton = () => {
    return () => {
      let points = { ...this.state.points };
      points[this.state.selected] += 1
      this.setState({
        points,
        voteClicked: true
      })
    }
  }



  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}<br></br>
        has {this.state.points[this.state.selected]} votes
        <br></br>
        <Button handleClick={this.klikVoteButton()} text={'vote'} />
        <Button handleClick={this.klikButton(this.props.anecdotes.length)} text={'next anecdote'} />
        <MostVotes anecdotes={this.props.anecdotes} points={this.state.points} voteClicked={this.state.voteClicked} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)