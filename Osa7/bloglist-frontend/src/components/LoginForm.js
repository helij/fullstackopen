import React from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import Notification from './../components/Notification'
import blogService from './../services/blogs'
import loginService from './../services/login'
import { notificationCreation } from './../reducers/notificationReducer'
import { setLoggedInUser } from './../reducers/loginReducer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    login = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            this.props.notificationCreation('welcome back!', 'info', 10)
            this.props.setLoggedInUser(user)
        } catch (exception) {
            this.props.notificationCreation('käyttäjätunnus tai salasana virheellinen', 'error', 5)
            setTimeout(() => {
                this.setState({ error: null })
            }, 5000)
        }
    }

    handleLoginChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        return (
            <div className='login-form'>
                {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Log-in to your account
                        </Header>
                        <Form size='large' onSubmit={this.login}>
                            <Segment stacked>
                                <Form.Input
                                    fluid icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleLoginChange} />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleLoginChange}
                                />

                                <Button color='teal' fluid size='large'>
                                    Login
                        </Button>
                            </Segment>
                        </Form>
                        {this.props.notification.text.length > 0 && 
                        <Message>
                            <Notification />
                        </Message>
                        }
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

        loggedInUser: state.loggedInUser,
        notification: state.notification
    }
}

const ConnectedApp = connect(
    mapStateToProps,
    { notificationCreation, setLoggedInUser }
)(LoginForm)

LoginForm.propTypes = {
    notification: PropTypes.object.isRequired,
    loggedInUser: PropTypes.object.isRequired,
    notificationCreation: PropTypes.func.isRequired,
    setLoggedInUser: PropTypes.func.isRequired
  }

export default ConnectedApp