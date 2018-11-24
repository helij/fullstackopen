import React from 'react'
import { Container } from 'semantic-ui-react'
import { notificationCreation } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import blogService from './../services/blogs'
import { setBlogs, setBlog } from './../reducers/blogReducer'

class Blog extends React.Component {

  like = (id) => async () => {
    const liked = this.props.blogs.find(b => b._id === id)
    const updated = { ...liked, likes: liked.likes + 1 }
    await blogService.update(id, updated)
    this.props.notificationCreation(`you liked '${updated.title}' by ${updated.author}`, 'info', 10)
    this.props.setBlogs(this.props.blogs.map(b => b._id === id ? updated : b))
    this.props.setBlog(updated)
  }

  addComment = (id,comment) => async () => {

    const updated = await blogService.addComment(id, comment)
    this.props.notificationCreation('comment: ' + comment, 'info', 10)
    this.props.setBlogs(this.props.blogs.map(b => b._id === id ? updated : b))
    this.props.setBlog(updated)
  }

  remove = (id) => async () => {
    const deleted = this.props.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if (ok === false) {
      return
    }

    await blogService.remove(id)
    this.props.notificationCreation(`blog '${deleted.title}' by ${deleted.author} removed`, 'info', 10)
    this.props.setBlogs(this.props.blogs.filter(b => b._id !== id))
    this.props.setBlog(null)
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const contentStyle = {
      margin: 5,
    }

    const blog = this.props.blog

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    let user = null
    if (loggedUserJSON) {
      user = JSON.parse(loggedUserJSON)
    }

    if (blog !== null) {

      const adder = blog.user ? blog.user.name : 'anonymous'
      return (
        <Container className='container-blog-padding'>
          <div style={blogStyle}>
            <div >
              {blog.title}: {blog.author}
            </div>
            <div style={contentStyle} className='content'>
              <div>
                <a href={blog.url}>{blog.url}</a>
              </div>
              <div>
                {blog.likes} likes <button onClick={this.like(blog._id)}>like</button>
              </div>
              <div>
                added by {adder}
              </div>
              {(blog.user === undefined || blog.user.username === user.username) && <div><button onClick={this.remove(blog._id)}>delete</button></div>}
            </div>
            <h3>Comments</h3>
             <button onClick={this.addComment(blog._id, 'Testi')}>add comment</button>
            {this.props.blog.comments.map(comment =>
            <div><li>{comment}</li></div>
            )}
          </div>
        </Container>
      )
    }
    else{
      return <div></div>
    }
  }
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs.blogs,
    blog: state.blogs.blog
  }
}


const ConnectedBlog = connect(
  mapStateToProps, {notificationCreation, setBlogs, setBlog}
)(Blog)

export default ConnectedBlog