import React from 'react'
import { connect } from 'react-redux'
import { Grid, Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class User extends React.Component {

  render() {

    return (
      <div>
          <Grid columns={1} padded>
            <Grid.Column>
            <Container className='container-padding'>
              <Grid.Row key = {this.props.user._id}>
                <h2>{this.props.user.name}</h2>
              </Grid.Row>
              </Container>
              <Container className='container-padding'>
              <Grid.Row>
                <h3>added blogs</h3>
              </Grid.Row>
              </Container>
              <Container className='container-padding'>
              {this.props.user.blogs.map(blog =>
                <Grid.Row key = {blog._id}>
                  <li>{blog.title}</li>
                </Grid.Row>
              )}
              </Container>
            </Grid.Column>
          </Grid>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    users: state.users.users,
    user: state.users.user
  }
}


const ConnectedUser = connect(
  mapStateToProps
)(User)


User.propTypes = {
  notification: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}
export default ConnectedUser