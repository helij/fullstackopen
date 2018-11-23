import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }
  render() {
   

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }


    return (
     <div>
      <h2>Users</h2>
      {this.props.users.map(user => 
      <div style={blogStyle} key={user._id}>
      
          {user.name}  {user.blogs.length} 
      
      </div>
      )}  
      </div> 
      
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return {
    notification: state.notification,
    users: state.users
  }
}


const ConnectedUser = connect(
  mapStateToProps
)(User)

export default ConnectedUser