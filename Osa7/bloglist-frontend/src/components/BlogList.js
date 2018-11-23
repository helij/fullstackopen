import React from 'react'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { setBlog } from './../reducers/blogReducer'

class BlogList extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }

  addBlog = (e, id, url) => {
    this.props.setBlog(this.props.blogs.find(a => a._id === id))
    this.props.history.push(url)

  }

  render() {
    return (
      <div>
        <h2>Blogs</h2>
        <Table striped celled>
          <Table.Body>
            {this.props.blogs.sort(byLikes).map(blog =>
              <Table.Row key={blog._id}>
                <Table.Cell> <Link to={`/blogs/${blog._id}`} onClick={e => this.addBlog(e, blog._id, `/blogs/${blog._id}`)} >{blog.title} {blog.author}</Link> </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const byLikes = (b1, b2) => b2.likes - b1.likes

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs.blogs
  }
}


const ConnectedBlogList = connect(
  mapStateToProps,
  { setBlog }
)(BlogList)

export default ConnectedBlogList