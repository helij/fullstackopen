import React from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import TogglableLink from './components/TogglableLink'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      showAll: true,
      username: '',
      password: '',
      user: null,
      notificationMessage: null,
      notificationClass: null
    }

    this.handleNoticationChange = this.handleNoticationChange.bind(this);
    this.updateBlogs = this.updateBlogs.bind(this);
  }

  componentDidMount() {
    this.updateBlogs()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.handleNoticationChange('käyttäjätunnus tai salasana virheellinen', 'error') 
    }
  }


  logout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  handleNoticationChange (message, style) {
    this.setState({
      notificationMessage: message,
      notificationClass: style
    })
    setTimeout(() => {
      this.setState({ notificationMessage: null })
    }, 5000)
  }

  updateBlogs () {
    blogService.getAll().then(blogs =>
      this.setState({ blogs: blogs.sort((a,b) => (a.likes > b.likes) ? 1 : ((b.likes > a.likes) ? -1 : 0)) })
    )
  }


  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>
      </div>
    )

    const logoutButton = () => (
      <button onClick={this.logout}>logout</button>
    )


    const blogForm = () => (
      
      <div>
        {this.state.blogs.map(blog =>
        <TogglableLink key={blog._id} buttonLabel={blog.title +" "+ blog.author} >
          <Blog key={blog._id} blog={blog} update={this.updateBlogs}/>
        </TogglableLink>
        )}
      </div>
    )


    return (
      <div>
        <Notification message={this.state.notificationMessage} style={this.state.notificationClass} />
        {this.state.user === null ?
          loginForm() :
          <div>
            <h2>blogs</h2>
            <p>{this.state.user.name} logged in {logoutButton()}</p>
            <Togglable buttonLabel="create new blog">
            <CreateBlog notification={this.handleNoticationChange} update={this.updateBlogs}/><br />
            </Togglable>
            {blogForm()}
          </div>
        }
      </div>
    );
  }
}

export default App;
