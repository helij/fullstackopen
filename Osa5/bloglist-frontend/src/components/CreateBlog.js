import React from 'react'

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


  render() {

    const createForm = () => (

      <div>
        <h2>create new</h2>

        <form onSubmit={this.create}>
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