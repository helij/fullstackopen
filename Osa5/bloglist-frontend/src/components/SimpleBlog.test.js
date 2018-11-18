import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const simpleBlog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Kalle',
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
    const contentDiv = blogComponent.find('.content')
    const contentLikeDiv = blogComponent.find('.contentLike')

    expect(contentDiv.text()).toContain(simpleBlog.title)
    expect(contentDiv.text()).toContain(simpleBlog.author)
    expect(contentLikeDiv.text()).toContain(simpleBlog.likes)
  })
})