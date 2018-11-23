const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_USERS':
    return action.users
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

export default userReducer