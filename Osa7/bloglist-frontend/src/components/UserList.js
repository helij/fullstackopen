import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { setUser } from './../reducers/userReducer'
import PropTypes from 'prop-types'

class UserList extends React.Component {

  addUser = (e, id, url) => {
    e.preventDefault()
    this.props.setUser(this.props.users.find(a => a._id === id))
    this.props.history.push(url)

  }

  render() {
    return (
        <div>
          <h2>Users</h2>
          <Table striped celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell>  </Table.Cell><Table.Cell>blogs added</Table.Cell>
              </Table.Row>
              {this.props.users.map(user =>
                <Table.Row key={user._id}>
                  <Table.Cell> <Link to={`/users/${user._id}`} onClick={e => this.addUser(e, user._id, `/users/${user._id}`)} >{user.name}</Link> </Table.Cell><Table.Cell>{user.blogs.length} </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    users: state.users.users
  }
}


const ConnectedUserList = connect(
  mapStateToProps,
  { setUser }
)(UserList)


UserList.propTypes = {
  notification: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired
}

export default ConnectedUserList