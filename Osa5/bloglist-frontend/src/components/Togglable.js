import React from 'react'
class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <p><button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button></p>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <p><button onClick={this.toggleVisibility}>hide</button></p>
        </div>
      </div>
    )
  }
}

export default Togglable