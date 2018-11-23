const blogReducer = (state = {blogs: [], blog: {}}, action) => {
  switch (action.type) {
  case 'SET_BLOGS':
    return {...state, blogs: action.blogs, blog: state.blog} 
    case 'SET_BLOG':
    return {...state, blogs: state.blogs, blog: action.blog} 
  default:
    return state
  }
}

export const setBlogs = (blogs) => {
  return async (dispatch) => {

    console.log('blogs', blogs)
    dispatch({
      type: 'SET_BLOGS',
      blogs
    })
   
  }
}


export const setBlog = (blog) => {
  return async (dispatch) => {
    console.log('blog', blog)
    dispatch({
      type: 'SET_BLOG',
      blog
    })
   
  }
}

export default blogReducer