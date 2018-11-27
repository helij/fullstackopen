import React from 'react'
import { HashRouter as Router, Route, NavLink } from 'react-router-dom'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import { notificationCreation } from './reducers/notificationReducer'
import { setUsers, setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogReducer'
import { setLoggedInUser, removeLoggedInUser } from './reducers/loginReducer'
import { connect } from 'react-redux'
import { Container, Menu } from 'semantic-ui-react'
import LoginForm from './components/LoginForm';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }


  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.notify('logged out')
    this.props.removeLoggedInUser()
  }

  MenuNav = () => (
    <Menu color='blue'>
      <Menu.Item as={NavLink} exact to="/" content="blogs" />
      <Menu.Item as={NavLink} exact to="/users" content="users" />
      <Container className='container-padding'>
        {this.props.loggedInUser.username} logged in
        <button style={{ marginLeft: 10 }} onClick={this.logout}>logout</button>
      </Container>
    </Menu>
  )

  async componentWillMount() {

    const blogs = await blogService.getAll()

    this.props.setBlogs(blogs)

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.props.setLoggedInUser(user)
      blogService.setToken(user.token)
    }
    const users = await userService.getAll()

    this.props.setUsers(users)


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
    const blogs = await blogService.getAll()
    this.props.setBlogs(blogs)
    const users = await userService.getAll()
    const user = users.find(user => user._id === result.user._id)

    this.props.setUsers(users)
    this.props.setUser(user)
    this.setState({
      title: '',
      url: '',
      author: ''
    })

  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }



  render() {
    if (this.props.loggedInUser === null) {

      return (
        <LoginForm />
      )
    }

    return (
      <Container>
        <Router  >
          <div>
            <h2>blog app</h2>
            <Notification />
            {this.MenuNav()}
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
            <Route exact path="/blogs/:id" render={({ history }) =>
              <Blog history={history} />} />
            <Route exact path="/" render={({ history }) => <BlogList history={history} />} />
            <Route exact path="/users/:id" render={() =>
              <User />} />
            <Route exact path="/users" render={({ history }) => <UserList history={history} />} />

          </div>
        </Router>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    users: state.users.users,
    user: state.users.user,
    blogs: state.blogs.blogs,
    blog: state.blogs.blog,
    loggedInUser: state.loggedInUser
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  { notificationCreation, setUsers, setBlogs, setLoggedInUser, removeLoggedInUser, setUser }
)(App)

export default ConnectedApp
