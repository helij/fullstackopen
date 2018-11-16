import React from 'react'
class TogglableLink extends React.Component {
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
        <div style={hideWhenVisible} className='blogStyle' >
          <button className= 'ownButton' onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible} className='blogStyle'>
        <button className= 'ownButton' onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default TogglableLink