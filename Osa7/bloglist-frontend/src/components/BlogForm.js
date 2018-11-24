import React from 'react'
import PropTypes from 'prop-types'
import { Container, Form, Button } from 'semantic-ui-react'

const BlogForm = ({ title, author, url, handleChange, handleSubmit }) => {
  return (
    <Container className='container-padding'>

      <h2>Luo uusi blogi</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input placeholder='Title' name='title' value={title} onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input placeholder='Author' name='author' value={author} onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <input placeholder='Url' name='url' value={url} onChange={handleChange} />
        </Form.Field>
        <Button type='submit'>Luo</Button>
      </Form>

    </Container>
  )

}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}


export default BlogForm