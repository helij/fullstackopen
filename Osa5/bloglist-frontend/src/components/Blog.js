import React from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, update, username }) => (

  <div>

    <p><a href={blog.url}>{blog.url}</a></p>
    <p>{blog.likes} likes <button onClick={(e) => updateBlog(e, blog, update)}>like</button></p>

    {blog.user.map(item => <p key={item._id}> added by {item.username}</p>)}

      {blog.user === null || blog.user.length === 0 || blog.user.find(x => x.username === username)  ? (
        <p><button className='blueButton' onClick={(e) => deleteBlog(e, blog, update)}>delete</button></p>
      ) : (
        <p></p>
      )}

  </div>

)

const updateBlog = async (event, blog, update) => {
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
    update()
  }
  catch (exception) {
    console.log('cannot update a blog', exception)

  }

}

const deleteBlog = async (event, blog, update) => {
  event.preventDefault()
  try {
    if (window.confirm('delete \'' + blog.title + '\' by ' + blog.author + '?')) {
      await blogService.deleteBlog(blog._id)
      update()
    }
  }
  catch (exception) {
    console.log('cannot update a blog', exception)

  }

}


export default Blog