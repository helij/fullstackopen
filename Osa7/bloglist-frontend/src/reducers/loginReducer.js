const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN_USER':
      return action.loggedInUser
    case 'REMOVE_LOGGED_IN_USER':
      return null
    default:
      return state
  }
}


export const setLoggedInUser = (loggedInUser) => {
  return async (dispatch) => {

    dispatch({
      type: 'SET_LOGGED_IN_USER',
      loggedInUser
    })

  }
}


export const removeLoggedInUser = () => {
  return async (dispatch) => {

    dispatch({
      type: 'REMOVE_LOGGED_IN_USER'
    })

  }
}

export default loginReducer