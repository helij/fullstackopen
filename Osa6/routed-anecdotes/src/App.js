import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import { Grid, Image, Form, Button, Menu } from 'semantic-ui-react'

const MenuNav = () => (
  <Menu color='blue'> 
    <Menu.Item as={NavLink} exact to="/" content="anecdotes" />
    <Menu.Item as={NavLink} to="/create" content="create new" />
    <Menu.Item as={NavLink} to="/about" content="about" />
  </Menu>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a> </div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote => <Table.Row key={anecdote.id}><Table.Cell><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></Table.Cell></Table.Row >)}
      </Table.Body>
    </Table>
  </div>
)
          
const About = () => (
  <Container>
    <Grid columns={2} padded>
      <Grid.Row>
        <Grid.Column>
          <h2>About anecdote app</h2>
          <Container >
            <p>According to Wikipedia:</p>

            <em>An anecdote is a brief, revealing account of an individual person or an incident.
              Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
              such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
              An anecdote is "a story with a point."</em>

            <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
          </Container>
        </Grid.Column>
        <Grid.Column >
          <Image src='http://www.pmg.csail.mit.edu/~liskov/images/LISKOV_crop2.jpg' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
)

          
const Footer = () => (
  <div style={{paddingTop: 10}} >
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
        See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)
          
class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.showNotification('a new anecdote ' + this.state.content + ' created')
  }



  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>

          <Form.Field>
            <label>Content</label>
            <input placeholder='Content' name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>

          <Form.Field>
            <label>Author</label>
            <input placeholder='Author' name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>

          <Form.Field>
            <label>Url for more info</label>
            <input placeholder='Url' name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>

          <Button type='submit'>Create</Button>
        </Form>
      </div>
    )

  }
}
      
const notificationStyle = {
          color: 'green',
          border: '1px solid green',
          fontSize: 16,
          borderRadius: 10,
          padding: 10,
          margin: 10
        }
        
class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  showNotification = (text) => {
    this.setState({ notification: text })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  render() {
    return (
      <Container>
        <Router>
          <div >
          <h1>Software anecdotes</h1>
            <MenuNav />
            
            {this.state.notification.length > 0 &&
              <div style={notificationStyle}>
                {this.state.notification}
                </div>
            }
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew} showNotification={this.showNotification} />} />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />} />
            <Footer />
          </div>
        </Router>
      </Container>
    );
  }
}
      
      export default App;
