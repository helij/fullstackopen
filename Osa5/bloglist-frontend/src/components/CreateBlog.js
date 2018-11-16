import React from 'react'
import blogService from '../services/blogs'

class CreateBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      this.props.notification('a new blog \'' + this.state.title + '\' by ' + this.state.author + ' added', 'created')
      this.props.update()
    }
    catch (exception) {
      this.props.notification('cannot create a blog', 'error')
      this.props.update()
    }

  }


  render() {

    const createForm = () => (
      <div>
   
        <h3>create new</h3>

        <form onSubmit={this.createBlog}>
          <div>
            title
          <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            author
          <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            url
          <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
          </div>
          <button>create</button>
        </form>
      </div>
    )
    return (
      createForm()
    );
  }
}

export default CreateBlog