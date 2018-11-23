import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

class User extends React.Component {

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

                <Table.Cell> {user.name} </Table.Cell><Table.Cell>{user.blogs.length} </Table.Cell>
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
    users: state.users
  }
}


const ConnectedUser = connect(
  mapStateToProps
)(User)

export default ConnectedUser