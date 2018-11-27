import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}


export default ConnectedNotification