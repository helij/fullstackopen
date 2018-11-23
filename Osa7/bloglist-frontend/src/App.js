import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import { notificationCreation } from './reducers/notificationReducer'
import { setUsers } from './reducers/userReducer'
import { setBlogs } from './reducers/blogReducer'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      notification: null
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.props.setBlogs(blogs)
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }

    userService.getAll().then(users =>
      this.props.setUsers(users)
    )

  }

  notify = (message, type = 'info') => {
    this.props.notificationCreation(message, type, 10)
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }

    const result = await blogService.create(blog)
    this.notify(`blog '${blog.title}' by ${blog.author} added`)
    this.props.setBlogs(this.props.blogs.concat(result))
    this.setState({
      title: '',
      url: '',
      author: ''
    })
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.notify('logged out')
    this.setState({ user: null })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.notify('welcome back!')
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }



  render() {
    if (this.state.user === null) {
      return (
        <Container className='container-padding'>
          <div>
            <Notification notification={this.state.notification} />
            <h2>Kirjaudu sovellukseen</h2>
            <form onSubmit={this.login}>
              <div>
                käyttäjätunnus
              <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleLoginChange}
                />
              </div>
              <div>
                salasana
              <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleLoginChange}
                />
              </div>
              <button type="submit">kirjaudu</button>
            </form>
          </div>
        </Container>
      )
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogsInOrder = this.props.blogs.sort(byLikes)

    return (
      <Container>
        <Router>
          <div>
            <h2>blog app</h2>
            <Notification notification={this.state.notification} />

            <Container className='container-padding'>
              {this.state.user.name} logged in <button onClick={this.logout}>logout</button>
            </Container>
            <Container className='container-padding'>
              <Togglable buttonLabel='uusi blogi'>
                <BlogForm
                  handleChange={this.handleLoginChange}
                  title={this.state.title}
                  author={this.state.author}
                  url={this.state.url}
                  handleSubmit={this.addBlog}
                />
              </Togglable>
            </Container>
            <Route exact path="/blogs/:id" render={() =>
              <Blog />} />
            <Route path="/" render={({ history }) => <BlogList history={history} />} />
            <Route exact path="/users/:id" render={() =>
              <User />} />
            <Route path="/users" render={({ history }) => <UserList history={history} />} />

          </div>
        </Router>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    notification: state.notification,
    users: state.users.users,
    user: state.users.user,
    blogs: state.blogs.blogs,
    blog: state.blogs.blog
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  { notificationCreation, setUsers, setBlogs }
)(App)

export default ConnectedApp
