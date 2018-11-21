import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    if (this.props.notification.length > 0) {
      return (
        <div style={style}>
          {this.props.notification}
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}


const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification