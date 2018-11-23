const userReducer = (state = {users: [], user: {}}, action) => {
  switch (action.type) {
  case 'SET_USERS':
    return {...state, users: action.users, user: state.user} 
    case 'SET_USER':
    console.log('state 2', state)
    return {...state, users: state.users, user: action.user} 
  default:
    return state
  }
}

export const setUsers = (users) => {
  return async (dispatch) => {

    dispatch({
      type: 'SET_USERS',
      users
    })
   
  }
}


export const setUser = (user) => {
  return async (dispatch) => {

    dispatch({
      type: 'SET_USER',
      user
    })
   
  }
}

export default userReducer