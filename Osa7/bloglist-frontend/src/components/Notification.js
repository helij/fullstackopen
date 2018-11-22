import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    if (this.props.notification.text.length > 0) {
      return (
        <div className={this.props.notification.style }>
          {this.props.notification.text}
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
    notification: state.notification,
  }
}


const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification