import React from 'react'
const Blog = ({blog}) => (
  
  <div>
    <p><a href={blog.url}>{blog.url}</a></p>
    <p>{blog.likes} likes <button>like</button></p> 

    {blog.user.map(item => <p key={item._id}> added by {item.username}</p> )}  
  </div>  
)

export default Blog