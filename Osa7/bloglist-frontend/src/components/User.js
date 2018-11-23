import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

class User extends React.Component {

  render() {

    return (
      <div>
        <Table striped celled>
          <Table.Body>
          <Table.Row>
              <Table.Cell><h2>{this.props.user.name}</h2>  </Table.Cell><Table.Cell></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

    )
  }
}

const mapStateToProps = (state) => {

  console.log('state', state)
  return {
    notification: state.notification,
    users: state.users.users,
    user: state.users.user
  }
}


const ConnectedUser = connect(
  mapStateToProps
)(User)

export default ConnectedUser