import React from 'react'
import { mount } from 'enzyme'
import { Blog } from './Blog'

describe.only('<Blog />', () => {
  let blogComponent
  let blog


  beforeEach(() => {
    blog = {
      _id: '3493094',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: '',
      likes: 3,
      comments: ['Test comment']
    }
  
    blogComponent = mount(
      <Blog  blog={blog} />
    )
  })

  it('renders title and author', () => {

    expect(blogComponent.text()).toContain(blog.title)
    expect(blogComponent.text()).toContain(blog.author)
  })
  
})