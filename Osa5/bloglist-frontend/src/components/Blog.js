import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => (

  <div>
    <p><a href={blog.url}>{blog.url}</a></p>
    <p>{blog.likes} likes <button onClick={(e) => updateBlog(e, blog)}>like</button></p>

    {blog.user.map(item => <p key={item._id}> added by {item.username}</p>)}
  </div>



)

const updateBlog = async (event, blog) => {
  event.preventDefault()
  try {

    let userId = null

    if (blog.user.length > 0) {
      userId = blog.user[0]._id
    }

    const newBlog = {
      user: userId,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }

    await blogService.update(blog._id, newBlog)
  
  }
  catch (exception) {
    console.log('cannot update a blog', exception)

  }

}


export default Blog