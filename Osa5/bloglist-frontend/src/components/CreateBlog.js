import React from 'react'
import blogService from '../services/blogs'

class CreateBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      error: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createBlog = async (event) => {

    try {
      await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

   
    } catch (exception) {
  
      this.setState({
        error: 'cannot create a blog',
      })
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